$nodeDir = Join-Path $PSScriptRoot ".node"
$zipPath = Join-Path $PSScriptRoot "node-portable.zip"
$extractTemp = Join-Path $PSScriptRoot "node_temp"

if (-not (Test-Path (Join-Path $nodeDir "node.exe"))) {
    Write-Host "Local Node.js not found. Downloading Node.js v22.12.0..." -ForegroundColor Cyan
    
    # Enable TLS 1.2
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
    
    $url = "https://nodejs.org/dist/v22.12.0/node-v22.12.0-win-x64.zip"
    Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing
    
    Write-Host "Extracting Node.js package..." -ForegroundColor Cyan
    if (Test-Path $extractTemp) { Remove-Item -Path $extractTemp -Recurse -Force }
    Expand-Archive -Path $zipPath -DestinationPath $extractTemp -Force
    
    Write-Host "Configuring local directories..." -ForegroundColor Cyan
    if (-not (Test-Path $nodeDir)) { New-Item -ItemType Directory -Path $nodeDir | Out-Null }
    
    $extractedFolder = Get-ChildItem -Path $extractTemp -Directory | Select-Object -First 1
    Move-Item -Path "$($extractedFolder.FullName)\*" -Destination $nodeDir -Force
    
    # Clean up temp assets
    Remove-Item -Path $zipPath -Force
    Remove-Item -Path $extractTemp -Recurse -Force
    
    Write-Host "Local Node.js setup completed!" -ForegroundColor Green
} else {
    Write-Host "Local Node.js already exists." -ForegroundColor Green
}
