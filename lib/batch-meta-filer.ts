import { readdirSync, lstatSync } from 'fs';
import { MetaLoader } from './meta-loader';
import { MetaFiler } from './meta-filer';
import { MetaFilerConfig } from './meta-filer.config';

export class BatchMetaFiler {
  constructor(private cfg: MetaFilerConfig) {}

  async process(inx?) {
    const base = this.cfg.base;
    const ml = new MetaLoader(this.cfg);
    await ml.init();
    const mf = new MetaFiler(this.cfg);
    this.cfg.log('debug', 'start to load files in dir', base);
    if (inx) {
      const f = readdirSync(base)[16];
      mf.update(f, await ml.dump(f));
    } else {
      readdirSync(base).forEach(async (file: string) => {
        if (lstatSync([base, file].join('/')).isDirectory()) { return; }
        mf.update(file, await ml.dump(file));
      });
    }
    this.cfg.log('summary', 'done');
  }
}

