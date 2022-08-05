//#region import

import path from "path";

import { bundleMDX } from "mdx-bundler";
import { remarkMdxImages } from "remark-mdx-images";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";
import { remarkReadingTime } from "./remark-reading-time.js";
import { remarkTocHeadings } from "./remark-toc-headings.js";

import type { Frontmatter, Post, Toc } from "@global";

import {
  fromLib,
  getReadingTime,
  getSourceOfFile,
  POSTS_PATH,
  REACT_MDX_EXPORT_COMP,
  varName,
} from "./utils.js";

//#endregion

// https://github.com/tino-brst/personal-site/blob/main/lib/mdast-util-toc.ts
async function compileMdx(filePath: string) {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const directory = path.join(POSTS_PATH, "/", filePath);

  // store table of content
  let toc: Toc[] = [];
  let readingArr = [];

  try {
    const content = getSourceOfFile(directory);

    const { code, frontmatter } = await bundleMDX<Frontmatter>({
      source: content,
      cwd: POSTS_PATH,
      mdxOptions: (options) => {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkMdxImages,
          remarkMdxCodeMeta,
          [remarkTocHeadings, { exportRef: toc }],
          [remarkReadingTime, { exportRef: readingArr }],
        ];

        return options;
      },

      globals: {
        [`${fromLib}`]: {
          varName,
          defaultExport: false,
          namedExports: REACT_MDX_EXPORT_COMP,
        },
      },
    });

    const readTime = getReadingTime(readingArr);
    const state: Post = {
      code,
      readTime,
      frontmatter,
      toc,
    };

    return state;
  } catch (error) {
    // Here you get the error when the file was not found,
    // but you also get any other error
    console.error("Compilation error ");
    throw error;
  }
}

export { compileMdx };
