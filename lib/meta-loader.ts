import { MetaFilerConfig } from './meta-filer.config';
import { Track } from './model';

const tag3 = require('node-id3');
const apiClient = require('unirest');

export class MetaLoader {
  meta = {};
  apiToken = '';
  constructor(private cfg: MetaFilerConfig) {}
  async init() {
    const t: any = await this.login();
    const { access_token: at, token_type: tt } = t;
    this.apiToken = [tt, at].join(' ');
  }
  login() {
    return new Promise((d, r) => {
      apiClient
        .post('https://accounts.spotify.com/api/token')
        .type('x-www-form-urlencoded')
        .send({
          grant_type: 'client_credentials',
          client_id: this.cfg.cliKey,
          client_secret: this.cfg.cliToken
        })
        .end(r => {
          d(r.toJSON().body);
        });
    });
  }
  isEmpty(m) {
    m = m || {};
    return !m.title;
  }
  parse(fp) {
    fp = fp.replace('|', '-')
    const [fn, ext] = fp.split('.mp3');
    const [at, ft] = fn.split('-');
    const artist = ft ? at.split(/(feat.|ft.)/)[0] : '';
    const title = (ft || at).split('(')[0];
    return { title: title.trim(), artist: artist.trim() };
  }
  read(f) {
    return new Promise(r => {
      tag3.read(this.cfg.base + '/' + f, (e, t) => {
        r(t);
      });
    });
  }
  async dump(fp) {
    this.cfg.log('summary', 'dumping:', fp)
    const m: any = await this.read(fp);
    const q: any = this.isEmpty(m) ? this.parse(fp) : m;
    const r = this.makeQuery(q);
    this.cfg.log('detail', 'search query:', q)
    return this.search(r);
  }
  makeQuery(q) {
    if (this.cfg.simpleQuery) { return q.title; }
    return (q.title + ['artist', 'album', 'track', 'year'].reduce((r, k) => {
      return r + (q[k] ? ` ${k}:${q[k]}` : '');
    }, ''));
  }
  search(q) {
    const query: any = { q, type: 'track', limit: 1 };
    if (this.cfg.market) {
      query.market = this.cfg.market;
    }
    return new Promise<Track>((d, r) => {
      apiClient
        .get('https://api.spotify.com/v1/search')
        .type('json')
        .headers({ 'Authorization': this.apiToken })
        .query(query)
        .end((r) => {
          if (!r) { return; }
          let list;
          try {
            list = r.toJSON().body.tracks;
          } catch(e) {
            this.cfg.log('error', e);
          }
          this.cfg.log('debug', list.href, list.items.length);
          if (!list) { return; }
          const m = list.items[0];
          const t = new Track(m || { name: q });
          t.original = q;
          // this.cfg.log('debug', t)
          d(t);
        });
    });
  }
}

