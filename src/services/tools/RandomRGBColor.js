export const RandomRGBColor = {
  getRandomColor: () => {
    var r = () => (Math.random() * 256) >> 0;
    return {
      r: r(),
      g: r(),
      b: r(),
    };
  },
};
