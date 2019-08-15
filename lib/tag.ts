import { readdirSync} from 'fs';

const base = './19q3';

readdirSync(base).forEach(file => {
  console.log(file);
});
