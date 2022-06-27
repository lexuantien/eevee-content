"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeId = exports.nextId = void 0;
const big_integer_1 = __importDefault(require("big-integer"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../monorepo/index");
const root = `${index_1.findGitRoot()}/poro.json`;
// https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c
function nextId(userId) {
    const poroId = JSON.parse(fs_1.default.readFileSync(root, "utf-8"));
    if (poroId) {
        const { epoch, seq, shard, defaultRootId } = poroId;
        const time = Date.now() - epoch;
        const shardId = (userId || defaultRootId) % shard;
        const seqId = seq % 1024;
        // js support 64 bit but bitshift only support 32 bit
        // https://github.com/peterolson/BigInteger.js
        // There have been `time` milliseconds since the beginning of our epoch,
        // so to start our ID, we fill the left-most 64-41 bits with this value with a left-shift
        let id = big_integer_1.default(time).shiftLeft(23);
        // 13 bits (64-41-13) that represent the logical shard ID
        id = id.or(big_integer_1.default(shardId).shiftLeft(10));
        id = id.or(seqId);
        const data = Object.assign(Object.assign({}, poroId), { seq: seq + 1 });
        // update firestore then return id but future
        fs_1.default.writeFileSync(root, JSON.stringify(data), { flag: "w" });
        return id.toString();
    }
    throw new Error("Fail to generate id");
}
exports.nextId = nextId;
/**
 * @todo Bug
 * @param id
 */
function decodeId(id) {
    const time = (id >> 23) & 0x1ffffffffff;
    const shardId = (id >> 10) & 0x1fff;
    const seqId = (id >> 0) & 0x3ff;
    return { time, shardId, seqId };
}
exports.decodeId = decodeId;
// nextId().then(p => console.log(p))
// decodeId(3036071834745282581)
// console.log(Date.now() - 1293814800 * 1000)
// 1314220021721
