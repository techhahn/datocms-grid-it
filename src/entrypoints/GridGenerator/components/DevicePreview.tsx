import { ScreenSize } from "../types";
import { getColumnWidth, getColumnOffset, calculateColspan } from "../utils";
import "../style.css";

type DevicePreviewProps = {
  columns: any[];
  currentColumnIndex: string;
  screenSize: ScreenSize;
  width: number;
};

export function DevicePreview({
  columns,
  currentColumnIndex,
  screenSize,
  width,
}: Readonly<DevicePreviewProps>) {
  return (
    <div>
      <div
        className="device"
        style={{
          height: 20,
          width,
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        }}
      >
        {columns.map((col, index) => {
          const colWidth = getColumnWidth(col, screenSize);
          const colspan = calculateColspan(colWidth);
          const offset = getColumnOffset(col, screenSize);

          return colWidth ? (
            <div
              key={col.itemId + offset}
              className={`col ${
                index === parseInt(currentColumnIndex || "0") ? "col-active" : ""
              }`}
              style={{
                gridColumn: `span ${colspan} / span ${colspan}`,
                ...(offset ? { gridColumnStart: offset } : {}),
              }}
            />
          ) : null;
        })}
        <div className="device-button" />
      </div>
    </div>
  );
}