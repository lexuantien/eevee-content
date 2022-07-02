import type { ReadTimeResults } from "reading-time";

export type PostType = "story" | "diary";

export type Frontmatter = {
  // require
  author: string;
  categories: Array<string>;
  description: string;
  postId: string;
  meta: {
    keywords: Array<string>;
    [key: string]: string | Array<string>;
  };
  slugify: string;
  title: string;
  post: PostType;

  // optional
  archived?: boolean;
  date?: string;
  draft?: boolean;
};

export type Toc = {
  value: string;
  url: string;
  depth: number;
};

export type Post = {
  code: string;
  frontmatter: Frontmatter;
  readTime: ReadTimeResults;
  toc: Toc[];
};
