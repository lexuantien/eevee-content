import * as Mdast from "mdast";
declare type Node = {
    level: number;
    children: Array<Section>;
};
declare type Root = Node & {
    level: 0;
};
declare type Section = Node & {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    title: string;
    id: string;
};
/**
 * Get a table of contents representation of the `document`. Uses
 * `github-slugger` to create the ids for each heading based on their content.
 *
 * Given (showing the source markdown file instead of the actual `mdast` nodes
 * for simplicity):
 *
 * ```markdown
 * # Foo
 * ## Bar
 * # Foobar
 * ```
 *
 * Yields:
 *
 * ```ts
 * {
 *   level: 0,
 *   children: [
 *     {
 *       title: "Foo",
 *       id: "foo",
 *       level: 1,
 *       children: [
 *         {
 *           title: "Bar",
 *           id: "bar",
 *           level: 2,
 *           children: []
 *         }
 *       ]
 *     },
 *     {
 *       title: "Foobar",
 *       id: "foobar",
 *       level: 1,
 *       children: []
 *     }
 *   ]
 * }
 * ```
 */
declare function getTableOfContents(document: Mdast.Root): Root;
/**
 * Visit all nodes in a tree, invoking the passed callback function on each,
 * with the visited node and its ancestors as arguments.
 */
declare function visit(node: Node, onVisit: (node: Node, ancestors: Array<Node>) => void, ancestors?: Array<Node>): void;
/**
 * Flattens a tree doing a depth-first traversal.
 */
declare function flatten(node: Node): Array<Node>;
declare function isSection(node: Node): node is Section;
export { getTableOfContents, visit, flatten, isSection };
export type { Node, Root, Section };
