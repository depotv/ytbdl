const keys = ['name', 'track_number', 'disc_number', 'album', 'artists'];
export class Track {
  name: string;
  set track_number(v) {
    this.trackNumber = v;
  }
  trackNumber: number;
  set disc_number(v) {
    this.discNumber = v;
  }
  discNumber: number;
  set album(v) {
    if (!v) { return; }
    this.albumName = v.name;
    this.releaseDate = v.release_date;
    this.totalTracks = v.total_tracks;
  }
  totalTracks: number;
  releaseDate: string;
  albumName: string;
  set artists(v) {
    if (!v) { return; }
    v = v || [];
    this.artistsName = v.map(i => i.name).join(', ')
  }
  artistsName: string;
  constructor(o?) {
    keys.forEach(k => {
      this[k] = o[k];
    });
  }
}

