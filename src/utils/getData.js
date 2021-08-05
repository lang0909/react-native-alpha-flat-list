function getFirstLetter(name, validArray) {
  const firstChar = name.substring(0, 1);
  let firstVal = firstChar;
  if (firstChar.charCodeAt(0) >= 44032 && firstChar.charCodeAt(0) <= 55203) {
    let a = firstChar.charCodeAt(0);
    switch (true) {
      case a < 45208:
        firstVal = "ㄱ";
        break;
      case a < 45796:
        firstVal = "ㄴ";
        break;
      case a < 46972:
        firstVal = "ㄷ";
        break;
      case a < 47560:
        firstVal = "ㄹ";
        break;
      case a < 48148:
        firstVal = "ㅁ";
        break;
      case a < 49324:
        firstVal = "ㅂ";
        break;
      case a < 50500:
        firstVal = "ㅅ";
        break;
      case a < 51088:
        firstVal = "ㅇ";
        break;
      case a < 52264:
        firstVal = "ㅈ";
        break;
      case a < 52852:
        firstVal = "ㅊ";
        break;
      case a < 53440:
        firstVal = "ㅋ";
        break;
      case a < 54028:
        firstVal = "ㅌ";
        break;
      case a < 54616:
        firstVal = "ㅍ";
        break;
      case a < 55204:
        firstVal = "ㅎ";
        break;
    }
  }
  if (firstVal.charCodeAt(0) === 12594) {
    firstVal = "ㄱ";
  }
  if (firstVal.charCodeAt(0) === 12600) {
    firstVal = "ㄷ";
  }
  if (firstVal.charCodeAt(0) === 12611) {
    firstVal = "ㅂ";
  }
  if (firstVal.charCodeAt(0) === 12614) {
    firstVal = "ㅅ";
  }
  if (firstVal.charCodeAt(0) === 12617) {
    firstVal = "ㅈ";
  }
  const isValidLetter = validArray.indexOf(firstVal);

  if (isValidLetter !== -1) {
    return firstVal.toUpperCase();
  }

  return "#";
}

export default function getData(array) {
  const sortedArray = array.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const validLetter =
    "abcdefghijklmnopqrstuvwxyzㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ".split("");
  const dataSet = {
    ㄱ: [],
    ㄴ: [],
    ㄷ: [],
    ㄹ: [],
    ㅁ: [],
    ㅂ: [],
    ㅅ: [],
    ㅇ: [],
    ㅈ: [],
    ㅊ: [],
    ㅋ: [],
    ㅌ: [],
    ㅍ: [],
    ㅎ: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
    "#": [],
  };
  sortedArray.forEach((item) => {
    const letter = getFirstLetter(item.name, validLetter);
    if (!letter) return;

    if (!dataSet[letter]) {
      dataSet[letter] = [];
    }
    dataSet[letter].push(item);
  });
  const keyArray = Object.keys(dataSet);
  let result = [];
  for (let i = 0; i < keyArray.length; i++) {
    result = [...result, ...dataSet[keyArray[i]]];
  }
  return result;
}
