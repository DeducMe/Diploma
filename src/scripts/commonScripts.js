const mistakes = {
    0: "pass",
    1: "too many symbols",
    2: "not enough symbols",
    3: "regular not passed",
    4: "number too big",
    5: "number too small",

}


export const checkStringInput = (str, max, min, re = /./) => {
    if (str.length > max){
        return mistakes[1]
    }
    if (str.length < min){
        return mistakes[2]
    }
    if (re.test(String(str).toLowerCase())){
        return mistakes[3]
    }
    return mistakes[0]
}

export const checkIntInput = (num, maxNum, minNum) => {
    if (num > maxNum){
        return mistakes[4]
    }
    if (num < minNum){
        return mistakes[5]
    }
    return mistakes[0]
}