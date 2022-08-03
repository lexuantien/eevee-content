import { visit } from "unist-util-visit";
import pkg from "github-slugger";
import { toString } from "mdast-util-to-string";

const { slug } = pkg;

export const remarkTocHeadings = (options) => {
  return (tree) =>
    visit(tree, "heading", (node, index, parent) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: "#" + slug(textContent),
        depth: node.depth,
      });
    });
};
