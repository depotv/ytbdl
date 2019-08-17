import { create, write, read } from 'node-id3';

export function logId3Tags(fp) {
  console.log('~~~~~ log ID3 Tags: ')
  read(fp, (e, t) => {
    console.log(fp, t)
  });
}
