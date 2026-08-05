// 对 public/private/ 下的文章做密码加密（staticrypt）。
// 密码来源优先级：环境变量 PROTECTED_PASSWORD / STATICRYPT_PASSWORD → .protected-password 文件。
// 若都无，则跳过加密（文章保持明文，便于本地预览时不设密码也能看）。
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, renameSync, rmSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

let password = '';
let source = '';
if (process.env.PROTECTED_PASSWORD) { password = process.env.PROTECTED_PASSWORD; source = 'env PROTECTED_PASSWORD'; }
else if (process.env.STATICRYPT_PASSWORD) { password = process.env.STATICRYPT_PASSWORD; source = 'env STATICRYPT_PASSWORD'; }
else if (existsSync(path.join(repoRoot, '.protected-password'))) {
  const raw = readFileSync(path.join(repoRoot, '.protected-password'), 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  password = lines[0] || '';
  source = '.protected-password file';
}
if (!password) {
  console.warn('[encrypt] 未设置 PROTECTED_PASSWORD，跳过加密（私密文章保持明文）。');
  process.exit(0);
}
console.log(`[encrypt] password source = ${source}, length = ${password.length}`);
// 让 staticrypt 从环境变量读取密码，避免 shell 引号 / 特殊字符问题，且非交互不卡询问
process.env.STATICRYPT_PASSWORD = password;

const privateRoot = path.join(repoRoot, 'public', 'private');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

// 只加密「直接子目录」里的文章页 public/private/<slug>/index.html
// 排除 private 自身的 section 列表页（public/private/index.html）及其分页页（public/private/page/1/index.html）
const files = walk(privateRoot).filter((f) => path.dirname(path.dirname(f)) === privateRoot);
if (files.length === 0) {
  console.log('[encrypt] 未找到 public/private/*/index.html，无需加密。');
  process.exit(0);
}

for (const file of files) {
  const dir = path.dirname(file);
  const tmp = path.join(dir, '.enc_tmp'); // staticrypt 输出目录
  console.log(`[encrypt] 加密 ${path.relative(repoRoot, file)}`);
  execSync(`npx staticrypt "${file}" --short -d "${tmp}"`, { stdio: 'inherit', cwd: repoRoot });
  const enc = path.join(tmp, 'index.html');
  if (existsSync(enc)) renameSync(enc, file); // 移回覆盖原文章页
  rmSync(tmp, { recursive: true, force: true });
}

console.log(`[encrypt] 完成，共加密 ${files.length} 篇私密文章。`);
