import { mkdirSync, existsSync, copyFileSync, renameSync } from 'fs';
import { MetaFilerConfig } from './meta-filer.config';
import { Track } from './model';

const tag3 = require('node-id3');
//import { logId3Tags } from './utils';

export class MetaFiler {
  revised;
  checked;
  constructor(private cfg: MetaFilerConfig) {
    this.revised = this.cfg.base + '/revised';
    this.checked = this.cfg.base + '/checked';
    if (!existsSync(this.revised)) {
      mkdirSync(this.revised, { recursive: false });
    }
    if (!existsSync(this.checked)) {
      mkdirSync(this.checked, { recursive: false });
    }
  }
  update(f, t: Track) {
    if (t.incomplete) { return; }
    this.cfg.log('debug', f, t);
    this.cfg.log('detail', t.fileName);
    const fo = this.cfg.base + '/' + f;
    const fc = this.checked + '/' + f;
    const fr = this.revised + '/' + t.fileName;
    if (this.cfg.dryRun) {
      this.cfg.log('summary', 'DRY RUN', fr, t.id3Tags);
    } else {
      copyFileSync(fo, fr);
      renameSync(fo, fc);
      const wr = tag3.write(t.id3Tags, fr);
      this.cfg.log(wr ? 'summary' : 'warn', 'write back tags', wr ? 'success' : 'failed');
    }
  }
}

