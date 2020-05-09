# deno-isexe

A port of the [https://github.com/isaacs/isexe](https://github.com/isaacs/isexe) package for Deno

## Usage

```sh
# this exposes shell variables $UID and $GID to environment
# variables T_UID and T_GID for the deno process. workaround because
# i couldn't seem to find api for obtaining user gid. you need to use
# a shell like bash or zsh which populates the UID and GID shell variables
T_UID=$UID T_GID=$GID deno run --allow-read --allow-env main.ts
```

```js
// main.ts
import { isExecutable } from ''

try {
  const isExe await isExecutable('./file')
  isExe ?? console.log('file is executable')
} catch {
  console.log('error reading file')
}
```

```js
// main.ts
import { isExecutableSync } from ''

try {
  const isExe isExecutableSync('./file')
  isExe ?? console.log('file is executable')
} catch {
  console.log('error reading file')
}
```

## Api

### `isExecutable`

### `isExecutableSync`

### Options

- `ignoreErrors`
- `uid`
- `gid`
- `pathExt`
