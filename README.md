# eevee-content

## How to write your post

- Fork this project
- Install depencies: `yarn`
- Write post in new branch: `yarn checkout -b ...`
- If `new`: add some data to `author.ts` file

``` typescript
export const authors = {
  yournickname: { // choose somenickname but unique
    name: your name,
    url: your website,
    id: unique id //choose some number but unique
  }
  // example: 
  princesama: {
    name: "kuteprince9xx",
    url: "https://facebook.com/kuteprince9xx",
    id: 6970,
  },
};
```

- In root project, use `yarn create-post`, fill require content in command line
- Navigate to `content/{postType}/{title}` and start writting
- If done:
  + `git add .`
  + `git commit -m "update(content): add post [title post here]"`
  + `git push -f`
  + Create pull request
  + Send pull request link to me