$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$hugo = Join-Path $root "tools\hugo\hugo.exe"
& $hugo --gc --minify
