import { BatchMetaFiler } from './batch-meta-filer';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'yaml';

const ymlFp = './meta-filer.yml';
const cfg = {
  base: './19q3',
  cliKey: '',
  cliToken: '',
  verbose: 0
};

if (existsSync(ymlFp)) {
  const yml = readFileSync(ymlFp, 'utf8');
  const py = parse(yml);
  Object.assign(cfg, py);
}

if (cfg.verbose > 0) {
  console.log('========== \n\n\n')
  console.log('using config: \n', cfg);
}
const bmf = new BatchMetaFiler(cfg);
bmf.debug = true;
bmf.process();

