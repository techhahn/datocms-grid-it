import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { Canvas, Section } from "datocms-react-ui";
import get from "lodash/get";
import { useState } from "react";
import "./style.css";
import { ScreenConfigInputs } from "./components/ScreenConfigInputs";
import { getColumnData, parseScreenConfig } from "./utils";
import { DevicePreview } from "./components/DevicePreview";
import { ScreenConfigType } from "./types";

type Props = Readonly<{
  ctx: RenderFieldExtensionCtx;
}>;

function GridItGenerator({ ctx }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const stringifiedValues = get(
    ctx?.formValues,
    ctx?.fieldPath || ""
  ) as string;
  const initialValue = parseScreenConfig(stringifiedValues);

  const [large, setLarge] = useState(initialValue.large);
  const [medium, setMedium] = useState(initialValue.medium);
  const [small, setSmall] = useState(initialValue.small);

  const { columns, currentColumnIndex } = getColumnData(ctx);

  const updateFieldValue = (screenConfig: ScreenConfigType) => {
    ctx.setFieldValue(ctx.fieldPath, JSON.stringify(screenConfig));
  };

  return (
    <Canvas ctx={ctx}>
      <Section
        title="Column Settings"
        titleStyle={{ fontSize: "var(--font-size-l)" }}
        collapsible={{
          isOpen: !isCollapsed,
          onToggle: () => setIsCollapsed(!isCollapsed),
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 5,
          }}
        >
          <ScreenConfigInputs
            large={large}
            medium={medium}
            small={small}
            onLargeChange={(newValue) => {
              setLarge(newValue);
              updateFieldValue({ large: newValue, medium, small });
            }}
            onMediumChange={(newValue) => {
              setMedium(newValue);
              updateFieldValue({ large, medium: newValue, small });
            }}
            onSmallChange={(newValue) => {
              setSmall(newValue);
              updateFieldValue({ large, medium, small: newValue });
            }}
          />

          <DevicePreview
            columns={columns}
            currentColumnIndex={currentColumnIndex}
            screenSize="large"
            width={50}
          />
          <DevicePreview
            columns={columns}
            currentColumnIndex={currentColumnIndex}
            screenSize="medium"
            width={35}
          />
          <DevicePreview
            columns={columns}
            currentColumnIndex={currentColumnIndex}
            screenSize="small"
            width={20}
          />
        </div>
      </Section>
    </Canvas>
  );
}

export { GridItGenerator };
