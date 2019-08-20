import { readdirSync } from 'fs';
import { MetaLoader } from './meta-loader';
import { MetaFiler } from './meta-filer';
import { MetaFilerConfig } from './meta-filer.config';

export class BatchMetaFiler {
  constructor(private cfg: MetaFilerConfig) {}

  async process(base?: string) {
    base = base || this.cfg.base;
    const ml = new MetaLoader(this.cfg);
    await ml.init();
    const mf = new MetaFiler(this.cfg);
    this.cfg.log('debug', 'start to load files', base);
    // readdirSync(base).forEach(async (file: string) => {
    //   mf.update(await ml.dump(file));
    // });
    await ml.dump(readdirSync(base)[16]);
  }
}

