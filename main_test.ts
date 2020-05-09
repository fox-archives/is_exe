import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
import { isExecutable } from './main.ts'

Deno.test({
  name: 'executable file is executable',
  async fn(): Promise<void> {
    const isExec = await isExecutable('./script.sh')

    assertEquals(isExec, true)
  }
})

Deno.test({
  name: 'non-executable file is not executable',
  async fn(): Promise<void> {
    const isExec = await isExecutable('./readme.md')

    assertEquals(isExec, false)
  }
})


Deno.test({
  name: 'folder is not executable',
  async fn(): Promise<void> {
    const isExec = await isExecutable('.')

    assertEquals(isExec, false)
  }
})
