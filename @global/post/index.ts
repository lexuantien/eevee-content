import type { ReadTimeResults } from "reading-time";

export type PostType = "story" | "diary";

export type Author = {
  name: string;
  url: string;
  nickName: string;
  description: string;
  id: number;
};

export type Frontmatter = {
  // require
  author: Author;
  tags: Array<string>;
  description: string;
  postId: string;
  slugify: string;
  title: string;
  post: PostType;
  language: string;

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

export type PostI18n = {
  slugify: string;
  en?: Post;
  vi?: Post;
  ja?: Post;
};
