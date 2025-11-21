import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import {
  Button,
  Canvas,
  CaretDownIcon,
  CaretUpIcon,
  Dropdown,
  DropdownMenu,
  DropdownOption,
  Section,
  TextField
} from "datocms-react-ui";
import get from "lodash/get";
import { useState } from "react";
import "./style.css";

type Props = {
  ctx: RenderFieldExtensionCtx;
};

type ScreenConfigOptions = {
  value?: string;
  offset?: string;
};

type ScreenConfigType = {
  large?: ScreenConfigOptions;
  medium?: ScreenConfigOptions;
  small?: ScreenConfigOptions;
};

function GridItGenerator({ ctx }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const stringifiedValues = get(
    ctx?.formValues,
    ctx?.fieldPath || ""
  ) as string;
  const initialValue: ScreenConfigType = stringifiedValues
    ? JSON.parse(stringifiedValues)
    : {};
  const [large, setLarge] = useState(
    initialValue?.large || { value: "100", offset: "0" }
  );
  const [medium, setMedium] = useState(
    initialValue?.medium || { value: "100", offset: "0" }
  );
  const [small, setSmall] = useState(
    initialValue?.small || { value: "100", offset: "0" }
  );

  // get all column values
  const fieldPathSplit = ctx.fieldPath.split(".");
  const currentColumnIndex = fieldPathSplit[fieldPathSplit.length - 2];

  const columnsPath = fieldPathSplit
    .slice(0, fieldPathSplit.length - 2)
    .join(".");
  const columns: any[] = (get(ctx.formValues, columnsPath) || []) as any[];

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
          <div>
            <InputField
              screenSize="large"
              config={large}
              onChange={(newValue: ScreenConfigOptions) => {
                setLarge(newValue);
                ctx.setFieldValue(
                  ctx.fieldPath,
                  JSON.stringify({
                    large: newValue,
                    medium,
                    small,
                  })
                );
              }}
            />
          </div>
          <div>
            <InputField
              screenSize="medium"
              config={medium}
              onChange={(newValue: ScreenConfigOptions) => {
                setMedium(newValue);
                ctx.setFieldValue(
                  ctx.fieldPath,
                  JSON.stringify({
                    large,
                    medium: newValue,
                    small,
                  })
                );
              }}
            />
          </div>

          <div>
            <InputField
              screenSize="small"
              config={small}
              onChange={(newValue: ScreenConfigOptions) => {
                setSmall(newValue);
                ctx.setFieldValue(
                  ctx.fieldPath,
                  JSON.stringify({
                    large,
                    medium,
                    small: newValue,
                  })
                );
              }}
            />
          </div>

          <div>
            <div
              className="device"
              style={{
                height: 20,
                width: 50,
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              }}
            >
              {columns.map((col, index) => {
                const colWidth = col.widths
                  ? JSON.parse(col.widths)?.large?.value || 0
                  : 0;
                const colspan = Math.round((colWidth * 12) / 100);
                const offset = col.widths
                  ? JSON.parse(col.widths)?.large?.offset || "0"
                  : undefined;

                return colWidth ? (
                  <div
                    key={col.itemId + offset}
                    className={`col ${
                      index === parseInt(currentColumnIndex || "0")
                        ? "col-active"
                        : ""
                    }`}
                    style={{
                      gridColumn: `span ${colspan} / span ${colspan}`,
                      ...(offset ? {gridColumnStart: offset} : {})
                    }}
                  />
                ) : null;
              })}
              <div className="device-button" />
            </div>
          </div>
          <div>
            <div
              className="device"
              style={{
                height: 20,
                width: 35,
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              }}
            >
              {columns.map((col, index) => {
                const colWidth = col.widths
                  ? JSON.parse(col.widths)?.medium?.value || 0
                  : 0;
                const colspan = Math.round((colWidth * 12) / 100);
                const offset = col.widths
                  ? JSON.parse(col.widths)?.medium?.offset || "0"
                  : undefined;

                return colWidth ? (
                  <div
                    key={col.itemId + offset}
                    className={`col ${
                      index === parseInt(currentColumnIndex || "0")
                        ? "col-active"
                        : ""
                    }`}
                    style={{
                      gridColumn: `span ${colspan} / span ${colspan}`,
                      ...(offset ? {gridColumnStart: offset} : {})
                    }}
                  />
                ) : null;
              })}
              <div className="device-button" />
            </div>
          </div>
          <div>
            <div
              className="device"
              style={{
                height: 20,
                width: 20,
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              }}
            >
              {columns.map((col, index) => {
                const colWidth = col.widths
                  ? JSON.parse(col.widths)?.small?.value || 0
                  : 0;
                const colspan = Math.round((colWidth * 12) / 100);
                const offset = col.widths
                  ? JSON.parse(col.widths)?.small?.offset || "0"
                  : undefined;

                return colWidth ? (
                  <div
                    key={col.itemId + offset}
                    className={`col ${
                      index === parseInt(currentColumnIndex || "0")
                        ? "col-active"
                        : ""
                    }`}
                    style={{
                      gridColumn: `span ${colspan} / span ${colspan}`,
                      ...(offset ? {gridColumnStart: offset} : {})
                    }}
                  />
                ) : null;
              })}
              <div className="device-button" />
            </div>
          </div>
        </div>
      </Section>
    </Canvas>
  );
}

type InputFieldProps = {
  config: ScreenConfigOptions;
  screenSize: "large" | "medium" | "small";
  onChange: (newValue: ScreenConfigOptions) => void;
};

function InputField({ config, screenSize, onChange }: InputFieldProps) {
  const offsetSlots = 12;

  return (
    <div>
      <TextField
        name={screenSize}
        id={screenSize}
        label={`${
          screenSize.charAt(0).toUpperCase() + screenSize.slice(1)
        } screens`}
        value={config.value}
        placeholder={`${
          screenSize.charAt(0).toUpperCase() + screenSize.slice(1)
        }`}
        onChange={(newValue: string) => {
          if (!newValue || !Number.isNaN(Number.parseInt(newValue))) {
            onChange({ ...config, value: newValue });
          }
        }}
      />

      <Dropdown
        renderTrigger={({ open, onClick }) => (
          <Button
            buttonSize="xxs"
            onClick={onClick}
            rightIcon={open ? <CaretUpIcon /> : <CaretDownIcon />}
          >
            Start at
          </Button>
        )}
      >
        <DropdownMenu>
          {Array.from({ length: offsetSlots }).map((_, index) => (
            <DropdownOption
              key={index}
              onClick={() => {
                if (!index) {
                  return onChange({ ...config, offset: "" });
                }
                onChange({ ...config, offset: (index + 1).toString() });
              }}
              active={config.offset === (index + 1).toString()}
            >
              {index ? `By ${index + 1}` : "Default" }
            </DropdownOption>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export { GridItGenerator };
