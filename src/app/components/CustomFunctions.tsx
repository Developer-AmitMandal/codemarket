
const isEmptyArray = (array: any) => {
    return Array.isArray(array) && array.length === 0;
}

export { isEmptyArray }