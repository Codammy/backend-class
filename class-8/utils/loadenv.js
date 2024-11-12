import fs from 'fs';

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('.env', (err, data) => {
      if (err) reject(err);
      else resolve(data.toString());
    });
  });
}

export default async function loadenv() {
  const env = await readFile();
  let str = '';
  let e;
  for (let i = 0; i < env.length; i++) {
    if (env[i] === '\n' && str !== '') {
      e = str.trim().split('=');
      process.env[e[0]] = e[1];
      str = '';
      continue;
    }
    str += env[i];
  }
  e = str.trim().split('=');
  process.env[e[0]] = e[1];
}
