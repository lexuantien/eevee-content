import { visit } from "unist-util-visit";

export const remarkReadingTime = (options) => {
  return (tree) => {
    visit(tree, ["text", "code"], (node, index, parent) => {
      // don't know why ref "" fail
      options.exportRef.push(node.value);
    });
  };
};
