import { Menubar } from "primereact/menubar";
import "./Navbar.css";
import { FileUpload } from "primereact/fileupload";
import ImporterFactory from "../../services/importers/ImporterFactory";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUiWithMessage,
  START_IMPORT,
  unBlockUi,
} from "../../slice/BlockSlice";
import { updateElement } from "../../slice/FileSlice";
import history from "../../services/history";
import { Chip } from "primereact/chip";

const Navbar = (props) => {
  const historySlice = useSelector((state) => state.history);
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
      items: Labels.map((l) => {
        return {
          label: l.value,
          icon: `pi ${l.icon}`,
          command: l.command,
        };
      }),
    },
  ];

  const endTemplate = () => {
    return (
      <Chip
        label={historySlice.value}
        style={{ marginRight: "15px", cursor: "default" }}
        icon={`pi ${Labels.find((l) => l.value === historySlice.value).icon}`}
      />
    );
  };

  return (
    <>
      <Menubar model={items} end={endTemplate} />
    </>
  );
};

export default Navbar;

const Labels = [
  {
    value: "Attributes",
    icon: "pi pi-home",
    command: () => history.push("/attributes"),
  },
  {
    value: "Facts",
    icon: "pi pi-search",
    command: () => history.push("/facts"),
  },
  {
    value: "Rules",
    icon: "pi-question-circle",
    command: () => history.push("/rules"),
  },
];
