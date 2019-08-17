import { create, write, read } from 'node-id3';
import * as apiClient from 'unirest';
//import { Track } from './model';
//import { logId3Tags } from './utils';

export class MetaLoader {
  meta = {};
  constructor(private fp) {}
  login(client_id, client_secret) {
    return new Promise((d, r) => {
      apiClient
        .post('https://accounts.spotify.com/api/token')
        .type('x-www-form-urlencoded')
        .send({
          grant_type: 'client_credentials',
          client_id, client_secret
        })
        .end(r => {
          d(r.toJSON().body);
        });
    });
  }

  dump(token, q) {
    return new Promise((d, r) => {
      apiClient
        .get('https://api.spotify.com/v1/search')
        .type('json')
        .headers({ 'Authorization': token })
        .query({ q, type: 'track', })
        .end((r) => {
          if (!r) { return; }
          const list = r.toJSON().body.tracks;
          if (!list) { return; }
          const m = list.items[0];
          const t = new Track(m || { name: q });
          d(t);
        });
    });
  }
}
