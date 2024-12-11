import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: No command provided. Usage: npm run <create-component|create-page> <filename>');
  process.exit(1);
}

// Extract command and input path
const command = args[0];
const inputPath = args[1];

if (!inputPath) {
  console.error('Error: No filename provided. Usage: npm run <create-component|create-page> <filename>');
  process.exit(1);
}

// Determine base directory and templates based on the command
const baseDir = path.resolve(command === 'create-component' ? 'src/components' : 'src/pages');
const filePath = path.join(baseDir, inputPath);
const fullPath = path.resolve(filePath);
const dir = path.dirname(fullPath);
const componentName = path.basename(filePath, path.extname(filePath));
const relativePath = path.relative(baseDir, dir);
const fileExtension = '.vue';

// Templates for component and page
const templates = {
  component: `<script setup lang="ts">
// Add your script logic here
</script>

<template>
  <div>
    ${componentName} Component
  </div>
</template>

<style lang="scss" scoped>
/* Add your styles here */
</style>
`,
  page: `<script setup lang="ts">
// Add your script logic here
</script>

<template>
  <div>
    ${relativePath}/${componentName} Page 
  </div>
</template>

<style lang="scss" scoped>
/* Add your styles here */
</style>
`,
};

// Validate command and select the template
if (!['create-component', 'create-page'].includes(command)) {
  console.error(`Error: Invalid command "${command}". Use "create-component" or "create-page".`);
  process.exit(1);
}
const selectedTemplate = command === 'create-component' ? templates.component : templates.page;

// Ensure the base directory exists
// if (!fs.existsSync(baseDir)) {
//   console.error(`Error: Base directory "${baseDir}" does not exist.`);
//   process.exit(1);
// }

// Ensure the target directory exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create the file
const file = path.join(dir, componentName + fileExtension);

if (fs.existsSync(file)) {
  console.error(`Error: ${file} already exists.`);
  process.exit(1);
}

fs.writeFileSync(file, selectedTemplate, 'utf8');
console.log(`${command === 'create-component' ? 'Component' : 'Page'} created: ${file}`);
