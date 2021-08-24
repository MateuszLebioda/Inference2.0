class IdService {
  getId = (array) => {
    if (array.length === 0) return 0;
    return Math.max(array.map((a) => a.id)) + 1;
  };
}
export default new IdService();
