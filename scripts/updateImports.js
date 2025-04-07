import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 递归获取所有 .jsx 文件
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (path.extname(file) === '.jsx') {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};

// 更新文件内容
const updateFileContent = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(
    /from ['"]\.\.\/\.\.\/\.\.\/components\/Common\/PageTemplate['"];?/g,
    'from \'@/components/Common/PageTemplate\';'
  );
  fs.writeFileSync(filePath, updatedContent);
};

// 主函数
const main = () => {
  const pagesDir = path.join(path.dirname(__dirname), 'src/pages');
  const files = getAllFiles(pagesDir);

  console.log('Updating import paths...');
  files.forEach(file => {
    updateFileContent(file);
    console.log(`Updated: ${file}`);
  });
  console.log('Import paths update completed!');
};

main(); 