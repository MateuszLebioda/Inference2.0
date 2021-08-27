class NumberComparator {
  compare = (n1, n2) => {
    if (Number(n1) < Number(n2)) return -1;
    if (Number(n1) > Number(n2)) return 1;
    return 0;
  };
}

export default new NumberComparator();
