"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (str = "") => {
    let slug = str
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");
    // If the value starts with a number, swap it out!
    // Doing this in a dumb way for now.
    if (slug.match(/^[\d]{1,2}/)) {
        slug = slug.replace(/^[\d]{1,2}/, "digit");
    }
    return slug;
};
exports.slugify = slugify;
