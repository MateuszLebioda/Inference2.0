class StringComparator {
  compare = (s1, s2) => {
    if (s1.toString() < s2.toString()) return -1;
    if (s1.toString() > s2.toString()) return 1;
    return 0;
  };
}

export default new StringComparator();
