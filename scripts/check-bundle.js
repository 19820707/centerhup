#!/usr/bin/env node

/**
 * Bundle Budget Checker - CenterHub
 * Verifica se o bundle está dentro dos limites de performance
 */

import fs from 'node:fs';
import path from 'node:path';

// Limites de performance
const BUDGETS = {
  // JavaScript acima da dobra (home/PLP/PDP)
  JS_ABOVE_FOLD: 170 * 1024, // 170KB gzip
  
  // CSS total
  CSS_TOTAL: 50 * 1024, // 50KB gzip
  
  // Imagens por página
  IMAGES_PER_PAGE: 500 * 1024, // 500KB total
  
  // Total de assets por página
  TOTAL_PER_PAGE: 1 * 1024 * 1024, // 1MB total
};

class BundleChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      js: 0,
      css: 0,
      images: 0,
      total: 0
    };
  }

  async checkBundle() {
    console.log('📦 Verificando orçamento de bundle...\n');
    
    const outDir = path.join(process.cwd(), 'out');
    
    if (!fs.existsSync(outDir)) {
      this.errors.push('Diretório "out" não encontrado. Execute "npm run build" primeiro.');
      return this.report();
    }
    
    // Verificar arquivos JavaScript
    await this.checkJavaScript(outDir);
    
    // Verificar arquivos CSS
    await this.checkCSS(outDir);
    
    // Verificar imagens
    await this.checkImages(outDir);
    
    // Verificar total
    this.checkTotal();
    
    return this.report();
  }

  async checkJavaScript(outDir) {
    const jsFiles = this.findFiles(outDir, ['.js']);
    let totalSize = 0;
    
    for (const file of jsFiles) {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    }
    
    this.stats.js = totalSize;
    
    // Estimar tamanho gzipped (aproximadamente 30% do original)
    const gzippedSize = totalSize * 0.3;
    
    console.log(`📄 JavaScript: ${(totalSize / 1024).toFixed(1)}KB (${(gzippedSize / 1024).toFixed(1)}KB gzip)`);
    
    if (gzippedSize > BUDGETS.JS_ABOVE_FOLD) {
      this.errors.push(`JavaScript acima do limite: ${(gzippedSize / 1024).toFixed(1)}KB > ${(BUDGETS.JS_ABOVE_FOLD / 1024).toFixed(1)}KB`);
    } else if (gzippedSize > BUDGETS.JS_ABOVE_FOLD * 0.8) {
      this.warnings.push(`JavaScript próximo do limite: ${(gzippedSize / 1024).toFixed(1)}KB`);
    }
  }

  async checkCSS(outDir) {
    const cssFiles = this.findFiles(outDir, ['.css']);
    let totalSize = 0;
    
    for (const file of cssFiles) {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    }
    
    this.stats.css = totalSize;
    
    // Estimar tamanho gzipped (aproximadamente 20% do original)
    const gzippedSize = totalSize * 0.2;
    
    console.log(`🎨 CSS: ${(totalSize / 1024).toFixed(1)}KB (${(gzippedSize / 1024).toFixed(1)}KB gzip)`);
    
    if (gzippedSize > BUDGETS.CSS_TOTAL) {
      this.errors.push(`CSS acima do limite: ${(gzippedSize / 1024).toFixed(1)}KB > ${(BUDGETS.CSS_TOTAL / 1024).toFixed(1)}KB`);
    } else if (gzippedSize > BUDGETS.CSS_TOTAL * 0.8) {
      this.warnings.push(`CSS próximo do limite: ${(gzippedSize / 1024).toFixed(1)}KB`);
    }
  }

  async checkImages(outDir) {
    const imageFiles = this.findFiles(outDir, ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg']);
    let totalSize = 0;
    
    for (const file of imageFiles) {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    }
    
    this.stats.images = totalSize;
    
    console.log(`🖼️ Imagens: ${(totalSize / 1024).toFixed(1)}KB`);
    
    if (totalSize > BUDGETS.IMAGES_PER_PAGE) {
      this.warnings.push(`Imagens acima do recomendado: ${(totalSize / 1024).toFixed(1)}KB > ${(BUDGETS.IMAGES_PER_PAGE / 1024).toFixed(1)}KB`);
    }
  }

  checkTotal() {
    this.stats.total = this.stats.js + this.stats.css + this.stats.images;
    
    console.log(`📊 Total: ${(this.stats.total / 1024).toFixed(1)}KB`);
    
    if (this.stats.total > BUDGETS.TOTAL_PER_PAGE) {
      this.warnings.push(`Total acima do recomendado: ${(this.stats.total / 1024).toFixed(1)}KB > ${(BUDGETS.TOTAL_PER_PAGE / 1024).toFixed(1)}KB`);
    }
  }

  findFiles(dir, extensions) {
    const files = [];
    
    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item).toLowerCase();
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    }
    
    traverse(dir);
    return files;
  }

  report() {
    console.log('\n📋 Relatório de Orçamento de Bundle');
    console.log('='.repeat(50));
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERROS (bloqueiam o build):');
      this.errors.forEach(error => console.log(`  • ${error}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️ AVISOS (recomendações):');
      this.warnings.forEach(warning => console.log(`  • ${warning}`));
    }
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ Todos os orçamentos estão dentro dos limites!');
    }
    
    // Recomendações
    if (this.stats.js > BUDGETS.JS_ABOVE_FOLD * 0.7) {
      console.log('\n💡 Recomendações para JavaScript:');
      console.log('  • Implementar code splitting por rota');
      console.log('  • Remover dependências não utilizadas');
      console.log('  • Usar dynamic imports para componentes pesados');
      console.log('  • Considerar lazy loading para componentes abaixo da dobra');
    }
    
    if (this.stats.css > BUDGETS.CSS_TOTAL * 0.7) {
      console.log('\n💡 Recomendações para CSS:');
      console.log('  • Usar PurgeCSS para remover CSS não utilizado');
      console.log('  • Implementar CSS-in-JS para tree shaking');
      console.log('  • Consolidar propriedades duplicadas');
    }
    
    if (this.stats.images > BUDGETS.IMAGES_PER_PAGE * 0.7) {
      console.log('\n💡 Recomendações para imagens:');
      console.log('  • Converter para WebP/AVIF');
      console.log('  • Implementar lazy loading');
      console.log('  • Usar next/image para otimização automática');
      console.log('  • Redimensionar imagens para o tamanho necessário');
    }
    
    // Retornar status
    return {
      success: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      stats: this.stats
    };
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new BundleChecker();
  const result = await checker.checkBundle();
  
  if (!result.success) {
    process.exit(1);
  }
}

export default BundleChecker;
