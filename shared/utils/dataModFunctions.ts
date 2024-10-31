/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// convert string to an array
export function stringToArray(value: string) {
  const array = [];
  array.push(value);
  return array;
}

// rename json keys
export function renameKey(obj, oldKey, newKey) {
  console.log("oldKey: ", oldKey);
  console.log("newKey: ", newKey);

  if (oldKey !== newKey) {
    // Modify old key
    Object.defineProperty(
      obj,
      newKey,
      // Fetch description from object
      Object.getOwnPropertyDescriptor(obj, oldKey),
    );
    // Delete old key
    delete obj[oldKey];
    console.log("new obj ", obj);

    return obj;
  }
  return obj;
}
