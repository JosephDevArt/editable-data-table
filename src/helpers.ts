export const moveStringToStartOfArray = (
  arr: string[],
  targetString: string
) => {
  const newArr = [...arr];
  const index = newArr.indexOf(targetString);

  if (index !== -1) {
    newArr.unshift(newArr.splice(index, 1)[0]);
  }
  return newArr;
};
