import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1280, height: 1024 });

  console.log('Navigating to page...');
  // Ensure the dev server is running on this port
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Scroll to bottom to trigger any lazy loading or animations if needed
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if(totalHeight >= scrollHeight - window.innerHeight){
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // Wait a bit for animations to settle
  await new Promise(r => setTimeout(r, 2000));

  console.log('Generating PDF...');
  await page.pdf({
    path: path.join(__dirname, '../hove-painting-contractors.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px'
    }
  });

  await browser.close();
  console.log('PDF generated successfully: hove-painting-contractors.pdf');
})();
