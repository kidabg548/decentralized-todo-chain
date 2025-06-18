const fs = require('fs');
const path = require('path');

// Create artifacts directory if it doesn't exist
const artifactsDir = path.join(__dirname, '../artifacts');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

// Copy TaskManager.json from hardhat project
const sourcePath = path.join(__dirname, '../../artifacts/contracts/TaskManager.sol/TaskManager.json');
const destPath = path.join(__dirname, '../artifacts/contracts/TaskManager.sol/TaskManager.json');

// Create the destination directory if it doesn't exist
const destDir = path.dirname(destPath);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy the file
fs.copyFileSync(sourcePath, destPath);
console.log('Contract artifacts copied successfully!'); 