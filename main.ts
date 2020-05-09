interface IOptions {
  ignoreErrors?: boolean;
  uid?: number;
  gid?: number;
  pathExt?: Array<string>;
}

export async function isExecutable(file: string, options?: IOptions): Promise<boolean> {
  const fileInfo: Deno.FileInfo = await Deno.stat(file);
  console.log("mode: ", fileInfo.mode);

  if (fileInfo.isDirectory) return false;

  return checkMode(fileInfo, options);
}

function checkMode(fileInfo: Deno.FileInfo, options?: IOptions): boolean {
  const realUid = Deno.env.get("T_UID");
  const realGid = Deno.env.get("T_GID");

  const mode = fileInfo.mode;
  const fileUid = fileInfo.uid;
  const fileGid = fileInfo.gid;

  const myUid = options?.uid ?? realUid;
  const myGid = options?.gid ?? realGid;

  const u = parseInt("100", 8);
  const g = parseInt("010", 8);
  const o = parseInt("001", 8);
  const ug = u | g;

  if (!mode) return false
  return Boolean((mode & o) ||
    (mode & g) && fileGid === myGid ||
    (mode & u) && fileUid === myUid ||
    (mode & ug) && myUid === 0)
}