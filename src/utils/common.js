/**
 * 操作对象所有key值
 * @param {Object} obj 
 * @param {Function} f 
 */
export const deepMapKeys = (obj, f) =>
  Array.isArray(obj)
    ? obj.map(val => deepMapKeys(val, f))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const val = obj[current];
        acc[f(current)] =
          val !== null && typeof val === 'object' ? deepMapKeys(val, f) : (acc[f(current)] = val);
        return acc;
      }, {})
    : obj;
