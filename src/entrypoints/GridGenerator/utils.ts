import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import get from "lodash/get";
import { ScreenConfigType, ScreenConfigOptions } from "./types";

const DEFAULT_CONFIG: ScreenConfigOptions = { value: "100", offset: "0" };

export function parseScreenConfig(stringifiedValues: string): ScreenConfigType {
  if (!stringifiedValues) {
    return {
      large: DEFAULT_CONFIG,
      medium: DEFAULT_CONFIG,
      small: DEFAULT_CONFIG,
    };
  }

  const parsed = JSON.parse(stringifiedValues);
  return {
    large: parsed?.large || DEFAULT_CONFIG,
    medium: parsed?.medium || DEFAULT_CONFIG,
    small: parsed?.small || DEFAULT_CONFIG,
  };
}

export function getColumnData(ctx: RenderFieldExtensionCtx) {
  const fieldPathSplit = ctx.fieldPath.split(".");
  const currentColumnIndex = fieldPathSplit[fieldPathSplit.length - 2];

  const columnsPath = fieldPathSplit
    .slice(0, fieldPathSplit.length - 2)
    .join(".");
  const columns: any[] = (get(ctx.formValues, columnsPath) || []) as any[];

  return { columns, currentColumnIndex };
}

export function getColumnWidth(col: any, screenSize: string): number {
  return col.widths ? JSON.parse(col.widths)?.[screenSize]?.value || 0 : 0;
}

export function getColumnOffset(col: any, screenSize: string): string | undefined {
  return col.widths ? JSON.parse(col.widths)?.[screenSize]?.offset || "0" : undefined;
}

export function calculateColspan(width: number): number {
  return Math.round((width * 12) / 100);
}