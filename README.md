# dijkstra-react-exer

Exercise Project for dijkstra's algo

# How to run

1. Make sure you have npm installed locally and configured (Highly recommended, use [`nvm`](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) (node version manager) to install npm)
2. cd into the root directory of the project
3. run `npm install`
4. run `npm run dev` to run in dev mode locally, click the link in the terminal and you should see the page on your browser
5. Highly recommended

# Stack

This Project uses React and Typescript with Vite stack to create a SPA (Single Page Application). Vite is a relatively new and very fast bundler that supports hot refresh for complex projects, and uses caching (both local and cloud) to improve build time.

# additional tools

1. Prettier for code formatting
2. eslint for code linting

# Important resources to reference

- [Typescript Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html), also [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Quickstart with Javascript](https://react.dev/learn) (you can use JS or TS, TS simply offers a better strict mode and type checking)
- [Using TypeScript with React](https://react.dev/learn/typescript)
- Using [React Hooks with Typescript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks/), necessary for state changes and sync, unless you're a masochist who wants to use [redux](https://react-redux.js.org/)

# Algorithm: Dijkstra

Explanation of the algo: [Dijkstras Shortest Path Algorithm Explained](https://www.youtube.com/watch?v=bZkzH5x0SKU)

There are multiple methods and different data structures that can be used to implement this.
For the sake of keeping things simple (although not optimized for speed), we will try implementing this with Typescript [Records](https://refine.dev/blog/typescript-record-type/#introduction) and [Arrays](https://www.w3schools.com/typescript/typescript_arrays.php).
As an optimization later, another interesting method could be using LinkedLists. Though Javascript doesn't natively support them, they can be emulated with some code.

Utilize the existing resources like like Spacing, Colors etc.
Keep the project modular, defined interfaces/types.
