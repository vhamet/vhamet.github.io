export const shuffle = <T>(array: T[]) => {
  const copy = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
};

export const sumOfArray = (array: number[]) =>
  array.reduce((sum, curr) => curr + sum, 0);
