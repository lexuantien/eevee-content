import type { MDXCollection } from "../../typings/my-mdx/index";
export declare const POSTS_PATH: string;
export declare function compileMdx(filePath: string): Promise<MDXCollection>;
