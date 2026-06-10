$files = Get-ChildItem "src/pages/blog/*.jsx"
foreach ($file in $files) {
    # Read with UTF8
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Determine category
    $category = "financial"
    if ($file.Name -match "Bmi|Tdee|Macro|BodyFat|Calories|Sleep") { $category = "health" }
    elseif ($file.Name -match "Math|Triangle|Percentage|Fraction|Statistics") { $category = "math" }
    elseif ($file.Name -match "Age|Gpa|Concrete|Fuel") { $category = "lifestyle" }

    $changed = $false
    
    # Inject import if missing
    if ($content -notmatch "import RelatedBlogs") {
        $content = $content -replace "(import React.*?from 'react';)", "`$1`nimport RelatedBlogs from '@/components/blog/RelatedBlogs';"
        $changed = $true
    }
    
    # Inject component if missing
    if ($content -notmatch "<RelatedBlogs") {
        # Using a regex to find the last </article> or </motion.article>
        $content = $content -replace "(</(?:motion\.)?article>)(?!.*</(?:motion\.)?article>)", "  <RelatedBlogs category=`"$category`" />`n      `$1"
        $changed = $true
    }

    if ($changed) {
        # Write with UTF8 without BOM (PowerShell 6+ defaults to No BOM, PowerShell 5.1 might use BOM. Let's force No BOM if possible, or just let Vercel handle it. We can use .NET directly for No BOM)
        $utf8NoBom = New-Object System.Text.UTF8Encoding $False
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        Write-Host "Updated $($file.Name) with category $category"
    }
}
Write-Host "All files processed."
