export declare function nextId(userId?: number): string;
/**
 * @todo Bug
 * @param id
 */
export declare function decodeId(id: number): {
    time: number;
    shardId: number;
    seqId: number;
};
