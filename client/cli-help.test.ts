import { test, expect } from "bun:test";

test("kitebook help shows op metadata and suggests names for an unknown op", () => {
  const run = (op: string) => Bun.spawnSync([process.execPath, "run", "client/cli.ts", "help", op], { cwd: import.meta.dir + "/..", env: { ...process.env, KITEBOOK_CACHE: "" } });
  const good = run("task_create"), output = good.stdout.toString();
  expect(good.exitCode).toBe(0);
  expect(output).toContain("Hand a task to another peer");
  expect(output).toContain("target: string (required)");
  const bad = run("task_creat");
  expect(bad.exitCode).toBe(1);
  expect(bad.stderr.toString()).toContain("closest: task_create");
});
