class FileService {
  createEmptyFile = (id = null) => {
    return {
      id: id,
      name: null,
      attributes: [],
      rules: [],
      facts: [],
    };
  };
}

export default FileService;
