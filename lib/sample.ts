// batch update mp3 meta and move to certian place
import { BatchMetaFiler } from './batch-meta-filer';
import { MetaFilerConfig } from './meta-filer.config';

const cfg = new MetaFilerConfig('./meta-filer.yml');
const bmf = new BatchMetaFiler(cfg);
bmf.process();

// 
