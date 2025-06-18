$sourcePath = Join-Path $PSScriptRoot "..\..\artifacts\contracts\TaskManager.sol\TaskManager.json"
$destPath = Join-Path $PSScriptRoot "..\artifacts\contracts\TaskManager.sol\TaskManager.json"

# Create destination directory if it doesn't exist
$destDir = Split-Path -Parent $destPath
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Copy the file
Copy-Item -Path $sourcePath -Destination $destPath -Force
Write-Host "Contract artifacts copied successfully!" 