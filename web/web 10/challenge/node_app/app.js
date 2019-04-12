'use strict';

const crypto = require('crypto');
const express = require('express');
const path = require('path');
const fs = require('fs');
const buffer = require('buffer')

const app = express();
const server = app.listen(
  parseInt(process.env.APP_PORT) || 9002,
  process.env.APP_HOST || '0.0.0.0',
  () => {
    console.log("Challenge ready!");
  }
);

const router = express.Router();

const secret = `t0ps3cr3t`;

app.use(express.static(`${__dirname}/client`));

router.get('/download', (req, res) => {

  if (!req.query.file || !req.query.check) {
    res.status(400).send({
      error: 'Invalid request! file & integrity check must be specified!'
    });
    return;
  }

  const file = unescape(req.query.file);
  const buff = Buffer.from(`${secret}${file}`,'binary');
  const check = crypto.createHash('sha512').update(buff).digest('hex');
  const filepath = path.normalize(`${__dirname}/files/${file}`);

  const paths = path.relative(path.normalize(`${__dirname}/files/`), filepath);
  const relative = !!paths && !paths.startsWith('..') && !path.isAbsolute(paths)

  if (!fs.existsSync(filepath)) {
    res.status(404).send({
      error: 'File not found!'
    });
  } else if (!relative) {
    res.status(400).send({
      error: 'Invalid file!'
    });
  } else if (check.toLowerCase() != req.query.check.toLowerCase()) {
    res.status(500).send({
      error: 'Integrity check failed!'
    });
  } else {
    res.download(filepath);
  }

});

app.use('/api', router);
