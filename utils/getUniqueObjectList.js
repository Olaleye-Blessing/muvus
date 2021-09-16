// function getUniqueListBy(arr, key) {
//     return [...new Map(arr.map((item) => [item[key], item])).values()];
// }

export const getUniqueObjectList = (lists, key) =>
    lists.filter(
        (list, index, array) =>
            array.findIndex((t) => t[key] === list[key]) === index
    );
