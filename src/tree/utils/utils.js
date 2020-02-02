/**
 * 字符计算
 * @param {内容} str
 */
export function charCount(str) {
  return (str && str.replace(/[^\x20-\xff]/g, 'x').length) || 0;
}

/**
 * 统计字符在字符串中出现次数
 * @param {字符串} str
 * @param {字符} char
 */
export function countCharExist(str, char) {
  const re = new RegExp(char, 'ig');
  return str.match(re) ? str.match(re).length : 0;
}

/**
 * differ
 * @param {数组}} a 
 * @param {数组} b 
 */
export function differArray(a, b) {
  const arr = a.concat(b);
  const obj = new Map();
  const result = [];

  arr.forEach(i => {
    if (!obj.get(i)) {
      obj.set(i, 1);
    } else {
      obj.set(i, obj.get(i) + 1);
    }
  });

  Array.from(obj.keys()).forEach(i => {
    const value = obj.get(i);
    if (value === 1) {
      result.push(i);
    }
  });

  return result;
}

/**
 * 10进制转化为20位2进制
 * @param {10进制数} tenNumber 
 */
export function convertTenToBinary(tenNumber) {
  return `0000000000000000000${tenNumber.toString(2)}`.slice(-20);
}

/**
 * 深拷贝
 * @param {对象} obj 
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}