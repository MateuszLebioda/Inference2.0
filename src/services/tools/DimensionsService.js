class DimensionsService {
  getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  getStandardRowCount = () => {
    return Math.floor((this.getWindowDimensions().height - 205) / 44.6);
  };
}
export default new DimensionsService();
