import { connect, Field } from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import { render } from "./utils/render";
import { GridItGenerator } from "./entrypoints/GridGenerator";

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions() {
    return [
      {
        id: "gridIt",
        name: "Grid Layout",
        type: "editor",
        fieldTypes: ["json"],
      },
    ];
  },

  overrideFieldExtensions(field: Field) {
    if (field.attributes.field_type === "json" && field.id === "gridIt") {
      return {
        editor: { id: "gridIt" },
      };
    }
  },
  renderFieldExtension(fieldExtensionId: string, ctx) {
    switch (fieldExtensionId) {
      case "gridIt":
        return render(<GridItGenerator ctx={ctx} />);
    }
  },
});
