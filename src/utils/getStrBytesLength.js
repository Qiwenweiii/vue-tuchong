export function getStrBytesLength(str) {
  if (!str || str === undefined) {
    throw new Error('请传入一个合法的字符串参数');
  }
  if (str.length === 0) return 0;

  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}
