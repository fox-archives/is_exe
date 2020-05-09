#!/bin/bash

start() {
  T_UID=$UID T_GID=$GID deno run --allow-read --allow-env main.ts
}

test() {
  T_UID=$UID T_GID=$GID deno test --allow-read --allow-env
}

test
