import { Menubar } from "primereact/menubar";
import "./Navbar.css";
import { FileUpload } from "primereact/fileupload";
import ImporterFactory from "../../services/importers/ImporterFactory";
import ForwardInference from "../../services/inferance/ForwardInference";

const Navbar = (props) => {
  const importerFactory = ImporterFactory;

  const handleOpenFile = (e) => {
    let reader = new FileReader();
    reader.onload = (file) => {
      let data = file.target.result;
      const importer = importerFactory.getImporter(".xml");
      importer.importFromFile(data);
    };
    reader.readAsText(e.files[0], "UTF-8");
  };

  const items = [
    {
      label: "File",
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
                chooseLabel="Import"
              />
            </div>
          ),
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          separator: true,
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left",
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right",
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  return (
    <>
      <Menubar model={items} />
    </>
  );
};

export default Navbar;
