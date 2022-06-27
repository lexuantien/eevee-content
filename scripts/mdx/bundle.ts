//#region import

import * as fs from "fs";
import * as path from "path";

import { bundleMDX } from "mdx-bundler";
import { remarkMdxImages } from "remark-mdx-images";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";

import calculateReadingTime from "reading-time";

import type TPQueue from "p-queue";
import type { Frontmatter, MDXCollection } from "../../typings/my-mdx/index";

import { remarkTocHeadings } from "./remark-toc-headings.js";

//#endregion

const reactMdxExportComp = [
  "Paragraph",
  "TextLink",
  "Blockquote",
  "Ul",
  "Ol",
  "Li",
  "I",
  "Em",
  "PostImage",
  "Strike",
  "InlineCode",
  "CH1",
  "CH2",
  "CH3",
  "H1",
  "H2",
  "H3",
  "ContentHeading",
  "Heading",
  "CodeSnippet",
  "SandPack",
  "HorizontalRule",
  "SideNote",
  "Expanded",
  "CodeBlock",
];

//reads the file
const getSourceOfFile = (path: string) => fs.readFileSync(path, "utf-8");

//Path to the posts folder
export const POSTS_PATH = path.join(process.cwd(), "/content");

let toc = [];

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
        ];

        return options;
      },

      globals: {
        "@eevee/react-mdx-comp": {
          varName: "reactMdxComp",
          defaultExport: false,
          namedExports: reactMdxExportComp,
        },
      },
    });

    const readTime = calculateReadingTime(content);

    const state: MDXCollection = {
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

// compileMdx("stories/how-to-use-async-functions-in-useeffect/index.mdx").then(
//   (p) => console.log(p.toc)
// );

let _queue: TPQueue | null = null;
async function getQueue() {
  const { default: PQueue } = await import("p-queue");
  if (_queue) return _queue;

  _queue = new PQueue({ concurrency: 1 });
  return _queue;
}

// We have to use a queue because we can't run more than one of these at a time
// or we'll hit an out of memory error because esbuild uses a lot of memory...
async function queuedCompileMdx(...args: Parameters<typeof compileMdx>) {
  const queue = await getQueue();
  const result = await queue.add(() => compileMdx(...args));
  return result;
}

export { queuedCompileMdx as compileMdx };
