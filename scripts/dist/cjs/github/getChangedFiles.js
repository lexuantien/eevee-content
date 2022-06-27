"use strict";
// try to keep this dep-free so we don't have to install deps
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const index_1 = require("../mdx/index");
const init_1 = require("../firestore/init");
const firestore_1 = require("firebase/firestore");
const slugify_1 = require("../slugify");
const postCol = init_1.createCollection("posts");
/**
 * @param {*} currentCommitSha default `HEAD^`
 * @param {*} compareCommitSha default `HEAD`
 * @returns
 */
function getChangedFiles(currentCommitSha = "HEAD^", compareCommitSha = "HEAD") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lineParser = /^(?<change>\w).*?\s+(?<filename>.+$)/;
            const gitOutput = child_process_1.execSync(`git diff --name-status ${currentCommitSha} ${compareCommitSha}`).toString();
            // const gitOutput = execSync(`git diff-tree --no-commit-id --name-status -r  735ce1b 504a137  `).toString();
            const changedFiles = gitOutput
                .split("\n")
                .map((line) => { var _a; return (_a = line.match(lineParser)) === null || _a === void 0 ? void 0 : _a.groups; })
                .filter(Boolean);
            const changes = [];
            for (const { change, filename } of changedFiles) {
                // const changeType = changeTypes[change];
                const changeType = change;
                if (changeType) {
                    // changes.push({ changeType: changeTypes[change], filename });
                    changes.push({ changeType, filename });
                }
                else {
                    console.error(`Unknown change type: ${change} ${filename}`);
                }
            }
            return changes;
        }
        catch (error) {
            console.error(`Something went wrong trying to get changed files.`, error);
            return null;
        }
    });
}
function go() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const changedFiles = (_a = (yield getChangedFiles())) !== null && _a !== void 0 ? _a : [];
        const contentPaths = changedFiles
            .filter((f) => f.filename.startsWith("content"))
            .map((f) => {
            f.filename = f.filename.replace(/^content\//, "");
            return f;
        });
        if (contentPaths.length) {
            console.log(`⚡️ Content changed. Requesting the cache be refreshed.`, {
                contentPaths,
            });
            contentPaths.forEach((element) => {
                if (element.changeType && element.changeType != "D") {
                    postMdxPost(element);
                }
            });
            console.log(`Content change request finished.`);
        }
        else {
            console.log("🆗 Not refreshing changed content because no content changed.");
        }
    });
}
function postMdxPost(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield index_1.compileMdx(content.filename);
        const { categories, description, meta, title, id } = result.frontmatter;
        // generate id for new mdx post
        // asume every thing true, no bug
        // improve later
        if (!id) {
            throw Error("id is require, please undo id");
        }
        else if (categories.length === 0) {
            throw Error("category must define");
        }
        else if (!description) {
            throw Error("description must define");
        }
        else if (!meta.keywords) {
            throw Error("meta.keywords must define");
        }
        else if (!title) {
            throw Error("title must define");
        }
        // maybe you change this after generate
        result.frontmatter.slugify = slugify_1.slugify(result.frontmatter.title);
        //  push to firestore
        const postDocRef = firestore_1.doc(postCol, `${id}`);
        yield firestore_1.setDoc(postDocRef, {
            code: result.code,
            frontmatter: result.frontmatter,
            readTime: result.readTime,
        }, { merge: true });
    });
}
go();
