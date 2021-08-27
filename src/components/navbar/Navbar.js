import { Menubar } from "primereact/menubar";
import "./Navbar.css";
import { FileUpload } from "primereact/fileupload";
import ImporterFactory from "../../services/importers/ImporterFactory";
import { useDispatch } from "react-redux";
import {
  blockUiWithMessage,
  START_IMPORT,
  unBlockUi,
} from "../../slice/BlockSlice";
import { updateElement } from "../../slice/FileSlice";

const Navbar = (props) => {
  const importerFactory = ImporterFactory;

  const dispatch = useDispatch();

  const handleOpenFile = (e) => {
    dispatch(blockUiWithMessage(START_IMPORT));
    let reader = new FileReader();
    reader.onload = (file) => {
      let data = file.target.result;
      const importer = importerFactory.getImporter(".xml");

      importer.importFromFile(data).then((r) => {
        dispatch(updateElement(r));
        dispatch(unBlockUi());
      });
    };
    reader.readAsText(e.files[0], "UTF-8");
  };

  const items = [
    {
      label: "Plik",
      icon: "pi pi-fw pi-file",
      items: [
        {
          icon: "pi pi-fw pi-plus",
          template: (
            <div className="file-upload-hover">
              <FileUpload
                className="file-upload-clear-style"
                mode="basic"
                onSelect={(e) => handleOpenFile(e)}
                auto
                chooseLabel="Importuj"
              />
            </div>
          ),
        },
      ],
    },
    {
      label: "Nawiguj",
      icon: "pi pi-map",
      items: [
        {
          label: "Atrybuty",
          icon: "pi pi-home",
        },
        {
          label: "Fakty",
          icon: "pi pi-search",
        },
        {
          label: "Reguły",
          icon: "pi pi-question-circle",
        },
      ],
    },
  ];

  return (
    <>
      <Menubar model={items} />
    </>
  );
};

export default Navbar;
