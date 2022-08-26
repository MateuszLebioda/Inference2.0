export class RGBColorToHex {
  colorToHex = ({ r, g, b }) => {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  };

  rgbToHex = (r, g, b) => {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  };

  componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
}
