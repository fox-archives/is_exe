// import { windows } from './windows.ts'
// import { mode } from './mode.ts'

export async function isExecutable(file: string): Promise<boolean> {
  const fileInfo: Deno.FileInfo = await Deno.stat(file);
  console.log("mode: ", fileInfo.mode);

  if (fileInfo.isDirectory) return false;

  const isExec = checkMode(fileInfo, {});
  console.log("a", isExec);
  return isExec;
}

await isExecutable("./.editorconfig");

interface IOptions {
  ignoreErrors?: boolean;
  uid?: number;
  gid?: number;
  pathExt?: Array<string>;
}

function checkMode(fileInfo: Deno.FileInfo, options: IOptions): boolean {
  const realUid = Deno.env.get("T_UID");
  const realGid = Deno.env.get("T_GID");

  const mode = fileInfo.mode;
  const uid = fileInfo.uid;
  const gid = fileInfo.gid;

  const myUid = options.uid !== undefined ? options.uid : realUid;
  const myGid = options.gid !== undefined ? options.gid : realGid;

  const u = parseInt("100", 8);
  const g = parseInt("010", 8);
  const o = parseInt("001", 8);
  const ug = u | g;

  if (!mode) return false
  return Boolean((mode & o) ||
    (mode & g) && gid === myGid ||
    (mode & u) && uid === myUid ||
    (mode & ug) && myUid === 0)
}
