import * as Unist from "unist-util-is";
import { toString } from "mdast-util-to-string";
import GitHubSlugger from "github-slugger";
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
function getTableOfContents(document) {
    const slugger = new GitHubSlugger();
    // Get top level document heading nodes
    const headings = document.children.filter(isHeading).map((heading) => {
        const title = toString(heading);
        const id = slugger.slug(title);
        return {
            title,
            id,
            level: heading.depth,
        };
    });
    // Build table of contents tree
    // TODO: but why? (explain algorithm)
    const root = { level: 0, children: [] };
    const stack = new Stack();
    stack.push(root);
    for (const heading of headings) {
        while (stack.top && heading.level <= stack.top.level) {
            stack.pop();
        }
        const section = {
            ...heading,
            children: [],
        };
        stack.top?.children.push(section);
        stack.push(section);
    }
    return root;
}
/**
 * The only way I've found of making TS properly narrow types when doing array
 * operations. Beware that (for some reason), it works only when doing
 * `array.filter/find/etc(isHeading)` and not
 * `array.filter/find/etc(((content) => isHeading(content))`.
 */
function isHeading(content) {
    return Unist.is(content, "heading");
}
/**
 * Basic implementation of the stack data structure.
 */
class Stack {
    array;
    constructor() {
        this.array = [];
    }
    get top() {
        return this.array.length ? this.array[this.array.length - 1] : undefined;
    }
    push(value) {
        this.array.push(value);
    }
    pop() {
        return this.array.pop();
    }
}
/**
 * Visit all nodes in a tree, invoking the passed callback function on each,
 * with the visited node and its ancestors as arguments.
 */
function visit(node, onVisit, ancestors = []) {
    onVisit(node, ancestors);
    for (const child of node.children) {
        visit(child, onVisit, [node, ...ancestors]);
    }
}
/**
 * Flattens a tree doing a depth-first traversal.
 */
function flatten(node) {
    const result = [node];
    for (const child of node.children) {
        result.push(...flatten(child));
    }
    return result;
}
function isSection(node) {
    return node.level !== 0;
}
export { getTableOfContents, visit, flatten, isSection };
