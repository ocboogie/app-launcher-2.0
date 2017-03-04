var dict = "qweasdzxc".split("");

export function changeKeys(keys: string) {
    dict = keys.split("");
    
}

function array2dict(array: number[]) {
    let out: string = "";
    array.forEach((value) => {
        out += dict[value];
    });
    return out;
}

export default function(size: number, limit: number) {
    var keys = [];
    const array = new Array(size);
    array.fill(0);
    for (var limitCount = 0; limitCount < limit; limitCount++) {
        for (var key = 0; key < dict.length; key++) {
            if (array[key] >= dict.length) {
                if (key + 1 >= array.length) {
                    return keys;
                }
                array[key] = 0;
                array[key + 1] += 1;
            }
        }
        keys.push(array2dict(array));
        array[0] += 1
        
    }
    return keys;
}