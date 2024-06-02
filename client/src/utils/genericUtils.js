export const generateUniqueID = () => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).slice(2, 5);
    return `${timestamp}${randomPart}`;
}

export const convertPrimitivesObjectToStrings = (obj) => {
    const newObj = {};
    for (let key in obj) {
        newObj[key] = obj[key].toString();
    }
    return newObj;
}

export const isInteger = (value) => Number.isInteger(value);

