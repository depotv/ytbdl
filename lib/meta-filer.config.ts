import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';
const ck = require('chalk');

const verbosities = {
  error: 1,
  warn: 10,
  summary: 100,
  detail: 1000,
  debug: 10000
};
const colors = {
  error: 'redBright',
  warn: 'yellowBright',
  summary: 'green',
  detail: 'cyanBright',
  debug: 'white' 
};

export class MetaFilerConfig {
  base = './19q3';
  cliKey = '';
  cliToken = '';
  verbose = 0;
  dryRun = false;
  simpleQuery = true;
  market: string[];
  constructor(private dp) {
    if (existsSync(dp)) {
      const yml = parse(readFileSync(dp, 'utf8'));
      Object.assign(this, yml);
    }
    this.log('', '\n\n ===== ==== =====');
    this.log('system', 'using config: \n', this);
  }
  canLog(v) {
    return (verbosities[v] || 0) <= this.verbose;
  }
  log(k, ...rest) {
    if (!this.canLog(k)) { return; }
    const tag = k ? ck[colors[k] || 'cyan'](`[${k.toUpperCase()}]`) : '';
    console.log(tag, ...rest);
  }
}

