import bigInt from 'big-integer';
import fs from 'fs';
import { findGitRoot } from '../monorepo/index';

const root = `${findGitRoot()}/poro.json`;

type PoroId = {
  epoch: number;
  seq: number;
  shard: number;
  defaultRootId: number;
};

export function nextId(userId?: number) {
  const poroId: PoroId = JSON.parse(fs.readFileSync(root, 'utf-8') as any);

  if (poroId) {
    const { epoch, seq, shard, defaultRootId } = poroId;

    const time = Date.now() - epoch;

    const seqId = seq % 1024;
    const shardId = (userId || defaultRootId) % shard;

    // js support 64 bit but bitshift only support 32 bit
    // https://github.com/peterolson/BigInteger.js
    let id = bigInt(time).shiftLeft(23);
    id = id.or(bigInt(shardId).shiftLeft(10));
    id = id.or(seqId);

    const data = {
      ...poroId,
      seq: seq + 1,
    };

    // update firestore then return id
    fs.writeFileSync(root, JSON.stringify(data), { flag: 'w' });

    return id.toString();
  }

  throw new Error('Fail to generate id');
}

/**
 * @todo Bug
 * @param id
 */
export function decodeId(id: number) {
  const time = (id >> 23) & 0x1ffffffffff;
  const shardId = (id >> 10) & 0x1fff;
  const seqId = (id >> 0) & 0x3ff;

  return { time, shardId, seqId };
}

// nextId().then(p => console.log(p))
// decodeId(3036071834745282581)
// console.log(Date.now() - 1293814800 * 1000)
// 1314220021721
