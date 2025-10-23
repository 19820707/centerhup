// Force Vercel to use correct commit
console.log('Vercel Build Config - Force Update');
console.log('Build timestamp:', new Date().toISOString());
console.log('Node version:', process.version);

module.exports = {
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  framework: 'nextjs',
  installCommand: 'npm ci --prefer-offline --no-audit',
  devCommand: 'npm run dev'
};
