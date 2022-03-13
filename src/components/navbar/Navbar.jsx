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
import { saveAs } from "file-saver";
import { useState } from "react";
import ConfirmRemoveKnowledgeBase from "./ConfirmRemoveKnowledgeBase";

const Navbar = (props) => {
  const historySlice = useSelector((state) => state.history);
  const file = useSelector((state) => state.file.value);
  const importerFactory = ImporterFactory;
  const dispatch = useDispatch();

  const [clearKnowledgeBaseDialog, setClearKnowledgeBaseDialog] =
    useState(false);

  const handleOpenFile = (e) => {
    let reader = new FileReader();
    reader.onload = (file) => {
      let type = file.target.result.includes('"importType": "Inference2.0"')
        ? ".json"
        : ".xml";
      let data = file.target.result;
      const importer = importerFactory.getImporter(type);

      importer.importFromFile(data).then((r) => {
        setTimeout(() => {
          dispatch(updateElement(r));
          dispatch(unBlockUi());
        }, 100);
      });
    };
    reader.readAsText(e.files[0], "UTF-8");
  };

  const save = () => {
    const blob = new Blob(
      [JSON.stringify({ ...file, importType: "Inference2.0" }, null, 1)],
      {
        type: "application/json",
      }
    );
    saveAs(blob, "Inference.json");
  };

  const Labels = [
    {
      value: "Atrybuty",
      icon: "pi pi-home",
      command: () => history.push("/attributes"),
    },
    {
      value: "Fakty",
      icon: "pi pi-search",
      command: () => history.push("/facts"),
    },
    {
      value: "Reguły",
      icon: "pi-question-circle",
      command: () => history.push("/rules"),
    },
    { separator: true },
    {
      icon: "pi pi-trash",
      value: "Wyczyść bazę wiedzy",
      command: () => {
        setClearKnowledgeBaseDialog(true);
      },
    },
  ];

  const items = [
    {
      label: "Plik",
      icon: "pi pi-fw pi-file",
      items: [
        {
          template: (
            <div className="file-upload-hover">
              <FileUpload
                className="file-upload-clear-style"
                mode="basic"
                onSelect={(e) => {
                  dispatch(blockUiWithMessage(START_IMPORT));
                  handleOpenFile(e);
                }}
                auto
                chooseOptions={{ label: "Importuj", icon: "pi pi-file" }}
              />
            </div>
          ),
        },

        {
          icon: "pi pi-save",
          label: "Zapisz",
          command: () => save(),
        },
      ],
    },
    {
      label: "Baza wiedzy",
      icon: "pi pi-map",
      items: Labels.map((l) =>
        l.separator
          ? { separator: true }
          : {
              label: l.value,
              icon: `pi ${l.icon}`,
              command: l.command,
            }
      ),
    },
    {
      label: "Wnioskuj",
      icon: "pi pi-cog",
      items: inference.map((l) => {
        return {
          label: l.label,
          icon: `pi ${l.icon}`,
          command: l.command,
        };
      }),
    },
    {
      label: "Metryki",
      icon: "pi pi-book",
      items: metrics.map((l) => {
        return {
          label: l.label,
          icon: `pi ${l.icon}`,
          command: l.command,
        };
      }),
    },
  ];

  const endTemplate = () => {
    let historyElement = [...Labels, ...inference, ...metrics].find(
      (l) => l.value === historySlice.value
    );

    return (
      <Chip
        label={historySlice.value}
        style={{ marginRight: "15px", cursor: "default" }}
        icon={`pi ${historyElement && historyElement.icon}`}
      />
    );
  };

  return (
    <>
      <Menubar model={items} end={endTemplate} />
      <ConfirmRemoveKnowledgeBase
        visible={clearKnowledgeBaseDialog}
        setVisible={(e) => setClearKnowledgeBaseDialog(e)}
      />
    </>
  );
};

export default Navbar;

const inference = [
  {
    label: "W przód",
    value: "Wnioskowanie w przód",
    icon: "pi pi-step-forward",
    command: () => history.push("/inference/forward"),
  },
  {
    label: "W tył",
    value: "Wnioskowanie w tył",
    icon: "pi pi-step-backward",
    command: () => history.push("/inference/backward"),
  },
];

const metrics = [
  {
    label: "Przeglądaj",
    value: "Lista metryk",
    icon: "pi pi-list",
    command: () => history.push("/metrics/preview"),
  },
  {
    label: "Porównaj",
    value: "Porównanie metryk",
    icon: "pi-arrows-h",
    command: () => history.push("/metrics/compare"),
  },
];
