#!/usr/bin/env node

// Script to replace the template strings in capacitor.tpl.config.json based on environment and platform type

const fs = require('fs');
const path = require('path');
const compile = require('es6-template-strings/compile');
const resolveToString = require('es6-template-strings/resolve-to-string');

var ROOT_DIR = '';
var FILES = {
  SRC: 'capacitor.tpl.config.ts',
  DEST: 'capacitor.config.ts'
};

var env = 'dev';
if (process.env["npm_config_env"]) env = process.env["npm_config_env"];
var platform = process.argv[2];
var envFile = 'preferences/' + platform + '/preferences.' + env + '.json';

var srcFileFull = path.join(ROOT_DIR, FILES.SRC);
var destFileFull = path.join(ROOT_DIR, FILES.DEST);
var configFileFull = path.join(ROOT_DIR, envFile);

var templateData = fs.readFileSync(srcFileFull, 'utf8');

var configData = fs.readFileSync(configFileFull, 'utf8');
var config = JSON.parse(configData);

var compiled = compile(templateData);
var content = resolveToString(compiled, config);

console.log('**~~Replacing template strings capacitor.json for env & platform:~~**', env, platform);

fs.writeFileSync(destFileFull, content);