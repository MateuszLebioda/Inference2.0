class DimensionsService {
  getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  getStandardRowCount = () => {
    return Math.floor(this.getStandardTableHeight() / 44.6);
  };

  getStandardTableHeight = () => {
    return Math.floor(this.getWindowDimensions().height - 215);
  };
}
export default new DimensionsService();
