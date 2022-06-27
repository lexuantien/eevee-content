"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSection = exports.flatten = exports.visit = exports.getTableOfContents = void 0;
const Unist = __importStar(require("unist-util-is"));
const mdast_util_to_string_1 = require("mdast-util-to-string");
const github_slugger_1 = __importDefault(require("github-slugger"));
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
    var _a;
    const slugger = new github_slugger_1.default();
    // Get top level document heading nodes
    const headings = document.children.filter(isHeading).map((heading) => {
        const title = mdast_util_to_string_1.toString(heading);
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
        const section = Object.assign(Object.assign({}, heading), { children: [] });
        (_a = stack.top) === null || _a === void 0 ? void 0 : _a.children.push(section);
        stack.push(section);
    }
    return root;
}
exports.getTableOfContents = getTableOfContents;
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
exports.visit = visit;
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
exports.flatten = flatten;
function isSection(node) {
    return node.level !== 0;
}
exports.isSection = isSection;
