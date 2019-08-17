import { readdirSync} from 'fs';
import { MetaLoader } from './meta-loader';
import { MetaFiler } from './meta-filer';

export class BatchMetaFiler {
  debug = false;
  constructor(private cfg = {}) {
  }
  process(base?) {
    base = base || this.cfg.base;
    readdirSync(base).forEach(file => {
      if (this.debug) {
        console.log(file);
      }
      const ml = new MetaLoader(file);
      const mf = new MetaFiler(ml.meta, file);
    });
  }
}

