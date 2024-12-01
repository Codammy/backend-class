export default function tokenGenarator(limit) {
  const range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  if (limit && limit <= 62) {
    for (let i = 0; i <= 62; i++) {
      let pos = Math.floor(Math.random() * 62);
      let char = range[pos];
      randomStr += char;
    }
    return randomStr;
  }
}

console.log(tokenGenarator(32));
