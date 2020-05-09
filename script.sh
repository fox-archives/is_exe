#!/bin/bash

start() {
  T_UID=$UID T_GID=$GID deno run --allow-read --allow-env main.ts
}

test() {
  T_UID=$UID T_GID=$GID deno test --allow-read --allow-env
}

case "$1" in
  start) start;;
  test) test;;
  help) echo "start, test";;
  *) echo "bad argument '$1'";;
esac
