import path from "path";
import fs from "fs";
import { promises as fss } from "node:fs";

import { compile } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import yaml from "js-yaml";
import { findGitRoot } from "../../monorepo/index";

const POSTS_PATH = path.join(findGitRoot(), "/content");
const getSourceOfFile = (path: string) => fs.readFileSync(path, "utf-8");

async function compileMdxJS(filePath: string) {
  const directory = path.join(POSTS_PATH, "/", filePath);
  const fileContent = getSourceOfFile(directory);

  const compiled = await compile(fileContent, {
    jsxRuntime: "classic",
    remarkPlugins: [remarkFrontmatter],
  });

  return compiled;
}

export { compileMdxJS };

// compileMdxJS("stories/mock-fake-post/index.mdx").then((p) =>
//   console.log(p.toString())
// );
