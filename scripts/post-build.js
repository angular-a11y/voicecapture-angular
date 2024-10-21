const fs = require('fs');
const path = require('path');
const terser = require('terser');
const glob = require('glob');
const jsonminify = require('jsonminify');

// Diretório de saída da build
const outputDir = 'dist/voicecapture-angular';

// Função para minificar um arquivo e remover a linha `//# sourceMappingURL=`
async function minifyFile(filePath) {
  try {
    // Lê o conteúdo do arquivo
    const content = fs.readFileSync(filePath, 'utf8');

    // Minifica o conteúdo do arquivo com remoção de comentários
    const result = await terser.minify(content, {
      format: { comments: false } // Remove comentários
    });

    if (result.error) {
      console.error(`Error minifying ${filePath}:`, result.error);
      return;
    }

    // Remove a linha `//# sourceMappingURL=`
    const minifiedContent = result.code.replace(/\/\/# sourceMappingURL=.*\s*/, '');

    // Grava o conteúdo minificado de volta ao arquivo
    fs.writeFileSync(filePath, minifiedContent, 'utf8');
    console.log(`Minified ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Função para minificar o package.json usando jsonminify
function minifyPackageJson() {
  try {
    const packageJsonPath = path.join(outputDir, 'package.json');
    const content = fs.readFileSync(packageJsonPath, 'utf8');

    // Minifica o JSON
    const minifiedContent = jsonminify(content);

    fs.writeFileSync(packageJsonPath, minifiedContent, 'utf8');
    console.log(`Minified ${packageJsonPath}`);
  } catch (error) {
    console.error('Error minifying package.json:', error);
  }
}

// Função para processar todos os arquivos
async function processFiles() {
  try {
    // Encontre todos os arquivos .js e .mjs no diretório de saída
    const jsFiles = glob.sync(path.join(outputDir, '**', '*.js'));
    const mjsFiles = glob.sync(path.join(outputDir, '**', '*.mjs'));

    // Minifique todos os arquivos encontrados
    for (const file of [...jsFiles, ...mjsFiles]) {
      await minifyFile(file);
    }

    // Remova os arquivos source map
    const sourceMaps = glob.sync(path.join(outputDir, '**', '*.map'));
    for (const mapFile of sourceMaps) {
      fs.unlinkSync(mapFile);
      console.log(`Removed source map ${mapFile}`);
    }

    // Minifique o package.json
    minifyPackageJson();

    // Remova o .npmignore
    const npmIgnorePath = path.join(outputDir, '.npmignore');
    if (fs.existsSync(npmIgnorePath)) {
      fs.unlinkSync(npmIgnorePath);
      console.log(`Removed .npmignore`);
    }

    console.log('Post-build processing completed.');
  } catch (error) {
    console.error('Error during post-build processing:', error);
  }
}

// Execute o script
processFiles();
