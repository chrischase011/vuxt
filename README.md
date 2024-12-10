# VUXT - A Minimal Vue Framework

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Vuxt Commands

### Create a Component

```sh
npm run create-component {component-name}
# OR
npm run create-component {directory/component-name}
```

### Create a Page

```sh
npm run create-page {page-name}
# OR
npm run create-page {directory/page-name}
```

## How to update latest Vuxt changes

1. Add the `upstream` remote: Go to the root of the user's project directory (the one where Vuxt is integrated).
```sh
git remote add upstream https://github.com/chrischase011/vuxt.git
```

2. __Verify the remotes:__ Check if the remotes were added successfully:
```sh
git remote -v
```

3. Fetch the latest updates from the original `Vuxt` repository:
```sh
git fetch upstream
```

4. Rebase the latest updates.
```sh
git rebase upstream/main
```