'use strict';

const fs = require('fs');
const yaml = require('yaml');

const document = yaml.parseDocument(fs.readFileSync('./config/default.yml', 'utf-8'));

console.log(document.get('log').get('loggers'));
