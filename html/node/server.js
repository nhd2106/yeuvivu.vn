const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('../../../../../../etc/letsencrypt/live/yeuvivu.vn/privkey.pem'),
  cert: fs.readFileSync('../../../../../../etc/letsencrypt/live/yeuvivu.vn/fullchain.pem')
};

app.prepare().then(() => {
  console.log(httpsOptions.key)
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});