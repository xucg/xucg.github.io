$ErrorActionPreference = "Stop"
$env:GOFLAGS = "-mod=mod"
# 确保本地 Go 在 PATH 中（Hugo Modules 拉取主题需要 go 二进制）
$goBin = Join-Path $env:USERPROFILE "go-portable\go\bin"
if (($env:PATH -notlike "*go-portable*") -and (Test-Path $goBin)) {
    $env:PATH = "$env:PATH;$goBin"
}
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$hugo = Join-Path $root "tools\hugo\hugo.exe"
if (-not (Test-Path $hugo)) { $hugo = "hugo" }  # 回退到 PATH 中的 hugo
& $hugo server --buildDrafts --bind 127.0.0.1 --port 1313
