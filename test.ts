import { fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { isExecutable, isExecutableSync } from "./main.ts";

Deno.test({
  name: "async: executable file is executable",
  async fn(): Promise<void> {
    const isExec = await isExecutable("./script.sh");

    assertEquals(isExec, true);
  },
});

Deno.test({
  name: 'sync: executable file is executable',
  fn(): void {
    const isExec = isExecutableSync("./script.sh")

    assertEquals(isExec, true)
  }
})

Deno.test({
  name: "async: non-executable file is not executable",
  async fn(): Promise<void> {
    const isExec = await isExecutable("./readme.md");

    assertEquals(isExec, false);
  },
});


Deno.test({
  name: "sync: non-executable file is not executable",
  fn(): void {
    const isExec = isExecutableSync("./readme.md");

    assertEquals(isExec, false);
  },
});

Deno.test({
  name: "async: folder is not executable",
  async fn(): Promise<void> {
    const isExec = await isExecutable(".");

    assertEquals(isExec, false);
  },
});

Deno.test({
  name: "sync: folder is not executable",
  fn(): void {
    const isExec = isExecutableSync(".");

    assertEquals(isExec, false);
  },
});

Deno.test({
  name: "async: non-existant file throws",
  async fn(): Promise<void> {
    try {
      await isExecutable("./non-existant");
      fail();
    } catch {}
  },
});

Deno.test({
  name: "sync: non-existant file throws",
  fn(): void {
    try {
      isExecutableSync("./non-existant");
      fail();
    } catch {}
  },
});

Deno.test({
  name: "async: non-existant file doesn't throw on `ignoreErrors` option",
  async fn(): Promise<void> {
    try {
      await isExecutable("./non-existant", {
        ignoreErrors: true
      })
    } catch {
      fail()
    }
  }
})

Deno.test({
  name: "sync: non-existant file doesn't throw on `ignoreErrors` option",
  fn(): void {
    try {
      isExecutableSync("./non-existant", {
        ignoreErrors: true
      })
    } catch {
      fail()
    }
  }
})
