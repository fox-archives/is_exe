# is_exe

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
  const isExe = await isExecutable('./file')
  isExe ?? console.log('file is executable')
} catch {
  console.log('error reading file')
}
```

## API

### `isExecutable(filePath, [options])`

### `isExecutableSync(filePath, [options])`

### Options

- `ignoreErrors` treat all errors as "no, this is not executable", but don't raise them.
- `uid` number to use as the user id
- `gid` number to use as the group id
- `pathExt` list of path extensions to use instead of PATHEXT environment variable on Windows *(not implemented)*
