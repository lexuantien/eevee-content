import bigInt from "big-integer";
import fs from "fs";
import { findGitRoot } from "../monorepo/index";
const root = `${findGitRoot()}/poro.json`;
// https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c
export function nextId(userId) {
    const poroId = JSON.parse(fs.readFileSync(root, "utf-8"));
    if (poroId) {
        const { epoch, seq, shard, defaultRootId } = poroId;
        const time = Date.now() - epoch;
        const shardId = (userId || defaultRootId) % shard;
        const seqId = seq % 1024;
        // js support 64 bit but bitshift only support 32 bit
        // https://github.com/peterolson/BigInteger.js
        // There have been `time` milliseconds since the beginning of our epoch,
        // so to start our ID, we fill the left-most 64-41 bits with this value with a left-shift
        let id = bigInt(time).shiftLeft(23);
        // 13 bits (64-41-13) that represent the logical shard ID
        id = id.or(bigInt(shardId).shiftLeft(10));
        id = id.or(seqId);
        const data = {
            ...poroId,
            seq: seq + 1,
        };
        // update firestore then return id but future
        fs.writeFileSync(root, JSON.stringify(data), { flag: "w" });
        return id.toString();
    }
    throw new Error("Fail to generate id");
}
/**
 * @todo Bug
 * @param id
 */
export function decodeId(id) {
    const time = (id >> 23) & 0x1ffffffffff;
    const shardId = (id >> 10) & 0x1fff;
    const seqId = (id >> 0) & 0x3ff;
    return { time, shardId, seqId };
}
// nextId().then(p => console.log(p))
// decodeId(3036071834745282581)
// console.log(Date.now() - 1293814800 * 1000)
// 1314220021721
