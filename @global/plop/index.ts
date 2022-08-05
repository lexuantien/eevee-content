export const BlogTypeArr = ["story", "diary"] as const;
export type BlogType = typeof BlogTypeArr[number];
