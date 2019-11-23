export function nullArrayOfLength(length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(null);
    }
    return array;
}