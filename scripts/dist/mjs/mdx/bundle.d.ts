import type { MDXCollection } from "../../typings/my-mdx/index";
export declare const POSTS_PATH: string;
declare function compileMdx(filePath: string): Promise<MDXCollection>;
declare function queuedCompileMdx(...args: Parameters<typeof compileMdx>): Promise<MDXCollection>;
export { queuedCompileMdx as compileMdx };
