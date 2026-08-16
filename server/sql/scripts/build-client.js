#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVER_DIR = join(__dirname, '..');  // server/
const PROJECT_ROOT = join(SERVER_DIR, '..'); // react-in-90ish/
const CLIENT_DIR = join(PROJECT_ROOT, 'client-tutorial');
const BUILD_DIR = join(CLIENT_DIR, 'dist');
const PUBLIC_DIR = join(SERVER_DIR, 'public');
const PUBLIC_APP_DIR = join(PUBLIC_DIR, '');

console.log('🚀 Building and deploying client-tutorial...\n');

// Step 1: Check if client-tutorial exists
if (!fs.existsSync(CLIENT_DIR)) {
  console.error('❌ Error: client-tutorial directory not found!');
  console.error(`   Expected: ${CLIENT_DIR}`);
  process.exit(1);
}

// Step 2: Build the client
console.log('📦 Building client-tutorial...');
try {
  execSync('npm run build', {
    cwd: CLIENT_DIR,
    stdio: 'inherit'
  });
  console.log('✅ Build completed!\n');
} catch (error) {
  console.error('❌ Build failed!');
  process.exit(1);
}

// Step 3: Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Error: Build directory not found!');
  console.error(`   Expected: ${BUILD_DIR}`);
  process.exit(1);
}

// Step 4: Clean old deployment
console.log('🧹 Cleaning old deployment...');
if (fs.existsSync(PUBLIC_APP_DIR)) {
  fs.rmSync(PUBLIC_APP_DIR, { recursive: true, force: true });
  console.log('✅ Old deployment removed\n');
}

// Step 5: Create public directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Step 6: Copy build to public/app
console.log('📋 Copying build to public/app...');
try {
  fs.cpSync(BUILD_DIR, PUBLIC_APP_DIR, { recursive: true });
  console.log('✅ Files copied!\n');
} catch (error) {
  console.error('❌ Copy failed:', error.message);
  process.exit(1);
}

// Step 7: Verify deployment
const indexPath = join(PUBLIC_APP_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ Deployment successful!');
  console.log('\n📍 Client app deployed to: public/');
  console.log('🌐 Access at: http://localhost:3001/\n');
  
  // Show file count
  const files = fs.readdirSync(PUBLIC_APP_DIR, { recursive: true });
  console.log(`📊 Total files deployed: ${files.length}`);
} else {
  console.error('❌ Deployment verification failed: index.html not found');
  process.exit(1);
}

console.log('\n✨ Done!');