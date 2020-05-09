#!/bin/bash

start() {
  deno run --allow-read --unstable --allow-env --allow-run main.ts
}

test() {
  deno test --allow-read --unstable --allow-env --allow-run
}

case "$1" in
  start) start;;
  test) test;;
  help) echo "start, test";;
  *) echo "bad argument '$1'";;
esac
