const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'files', 'Afik_CV.pdf');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
      const ext = path.extname(filePath);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
          return;
        }
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(0, () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function main() {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const { server, port } = await serve();
  console.log(`Serving on port ${port}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: OUT,
    format: 'A4',
    margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
    printBackground: true,
  });

  console.log(`PDF saved to ${OUT}`);

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
