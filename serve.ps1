$root = "C:\Users\chao ruby\OneDrive - The Boston Consulting Group, Inc\Desktop\Website"
$listener = New-Object Net.HttpListener
$listener.Prefixes.Add('http://localhost:3000/')
$listener.Start()
Write-Host "Listening on http://localhost:3000"
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $localPath = $ctx.Request.Url.LocalPath
    $filePath = Join-Path $root ($localPath.TrimStart('/').Replace('/', '\'))
    if (-not (Test-Path $filePath -PathType Leaf)) { $filePath = Join-Path $root 'index.html' }
    $mime = if ($filePath -match '\.css$') { 'text/css' } elseif ($filePath -match '\.js$') { 'application/javascript' } else { 'text/html; charset=utf-8' }
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $ctx.Response.ContentType = $mime
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.Close()
}
