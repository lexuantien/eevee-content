"use strict";
//#region import
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileMdx = exports.POSTS_PATH = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const mdx_bundler_1 = require("mdx-bundler");
const remark_mdx_images_1 = require("remark-mdx-images");
const remark_mdx_code_meta_1 = require("remark-mdx-code-meta");
const reading_time_1 = __importDefault(require("reading-time"));
const remark_toc_headings_js_1 = require("./remark-toc-headings.js");
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
const getSourceOfFile = (path) => fs.readFileSync(path, "utf-8");
//Path to the posts folder
exports.POSTS_PATH = path.join(process.cwd(), "/content");
let toc = [];
// https://github.com/tino-brst/personal-site/blob/main/lib/mdast-util-toc.ts
function compileMdx(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.platform === "win32") {
            process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), "node_modules", "esbuild", "esbuild.exe");
        }
        else {
            process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), "node_modules", "esbuild", "bin", "esbuild");
        }
        const directory = path.join(exports.POSTS_PATH, "/", filePath);
        try {
            const content = getSourceOfFile(directory);
            const { code, frontmatter } = yield mdx_bundler_1.bundleMDX({
                source: content,
                cwd: exports.POSTS_PATH,
                mdxOptions: (options) => {
                    var _a;
                    options.remarkPlugins = [
                        ...((_a = options.remarkPlugins) !== null && _a !== void 0 ? _a : []),
                        remark_mdx_images_1.remarkMdxImages,
                        remark_mdx_code_meta_1.remarkMdxCodeMeta,
                        [remark_toc_headings_js_1.remarkTocHeadings, { exportRef: toc }],
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
            const readTime = reading_time_1.default(content);
            console.log(toc);
            const state = {
                code,
                readTime,
                frontmatter,
                toc,
            };
            return state;
        }
        catch (error) {
            // Here you get the error when the file was not found,
            // but you also get any other error
            console.error("Compilation error ");
            throw error;
        }
    });
}
compileMdx("stories/how-to-use-async-functions-in-useeffect/index.mdx").then((p) => console.log(p.toc));
let _queue = null;
function getQueue() {
    return __awaiter(this, void 0, void 0, function* () {
        const { default: PQueue } = yield Promise.resolve().then(() => __importStar(require("p-queue")));
        if (_queue)
            return _queue;
        _queue = new PQueue({ concurrency: 1 });
        return _queue;
    });
}
// We have to use a queue because we can't run more than one of these at a time
// or we'll hit an out of memory error because esbuild uses a lot of memory...
function queuedCompileMdx(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = yield getQueue();
        const result = yield queue.add(() => compileMdx(...args));
        return result;
    });
}
exports.compileMdx = queuedCompileMdx;
