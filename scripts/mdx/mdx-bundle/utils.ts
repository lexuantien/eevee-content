import fs from "fs";
import path from "path";
import calculateReadingTime from "reading-time";
import { findGitRoot } from "@scripts/monorepo/index";

export const REACT_MDX_EXPORT_COMP = [
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
export const getSourceOfFile = (path: string) => fs.readFileSync(path, "utf-8");

//Path to the posts folder
export const POSTS_PATH = path.join(findGitRoot(), "/content");

export const varName = "reactMdxComp";

export const fromLib = "@eevee/react-mdx-comp";

export const getReadingTime = (readingArr) => {
  let readingText = readingArr.reduce((str, curr) => (str += `${curr} `), "");
  const readTime = calculateReadingTime(readingText);
  return readTime;
};
