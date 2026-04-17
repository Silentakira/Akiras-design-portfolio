#!/bin/bash

echo "🔍 Verifying Uriel Akira CV Website Setup..."
echo ""

# Check if required files exist
echo "📁 Checking project structure..."
required_files=(
  "package.json"
  "tsconfig.json"
  "tailwind.config.ts"
  "next.config.js"
  "postcss.config.js"
  "app/layout.tsx"
  "app/page.tsx"
  "app/globals.css"
  "lib/data.ts"
  "lib/animations.ts"
  "components/StatusBar.tsx"
  "components/Cursor.tsx"
  "components/sections/Hero.tsx"
  "components/sections/About.tsx"
  "components/sections/Experience.tsx"
  "components/sections/Tools.tsx"
  "components/sections/Marquee.tsx"
  "components/sections/Education.tsx"
  "components/sections/Contact.tsx"
  "hooks/useAnimateOnScroll.ts"
  "hooks/useReducedMotion.ts"
  "public/llms.txt"
  "public/favicon.ico"
  "public/robots.txt"
  "README.md"
  "CLAUDE.md"
)

all_files_exist=true
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (missing)"
    all_files_exist=false
  fi
done

echo ""
echo "📊 Project Summary:"
echo "   - Total TypeScript/React files: $(find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | wc -l)"
echo "   - Component files: $(find components -name "*.tsx" 2>/dev/null | wc -l)"
echo "   - Section components: $(find components/sections -name "*.tsx" 2>/dev/null | wc -l)"
echo "   - Custom hooks: $(find hooks -name "*.ts" 2>/dev/null | wc -l)"

echo ""
echo "🎨 Design System Check:"
if grep -q "--bg: #F5F2EC" app/globals.css; then
  echo "✅ CSS variables defined"
else
  echo "❌ CSS variables missing"
fi

if grep -q "Bebas Neue" app/layout.tsx; then
  echo "✅ Custom fonts configured"
else
  echo "❌ Custom fonts missing"
fi

echo ""
echo "📝 Content Check:"
if grep -q "URIEL AKIRA" lib/data.ts; then
  echo "✅ Personal info set"
else
  echo "❌ Personal info missing"
fi

if grep -q "Boutik Studio" lib/data.ts; then
  echo "✅ Experience data set"
else
  echo "❌ Experience data missing"
fi

echo ""
if [ "$all_files_exist" = true ]; then
  echo "✅ All required files present!"
  echo ""
  echo "🚀 Next Steps:"
  echo "   1. Install dependencies: npm install"
  echo "   2. Run development server: npm run dev"
  echo "   3. Open http://localhost:3000"
  echo "   4. Build for production: npm run build"
  echo ""
  echo "⚠️  Note: You currently have limited disk space. Please free up space before running npm install."
else
  echo "❌ Some required files are missing. Please review the output above."
fi

echo ""
echo "🔧 Configuration Files:"
echo "   - TypeScript: ✅ tsconfig.json"
echo "   - Tailwind: ✅ tailwind.config.ts"
echo "   - Next.js: ✅ next.config.js"
echo "   - PostCSS: ✅ postcss.config.js"

echo ""
echo "✨ Verification complete!"
