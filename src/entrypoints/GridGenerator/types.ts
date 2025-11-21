export type ScreenConfigOptions = {
  value?: string;
  offset?: string;
};

export type ScreenConfigType = {
  large?: ScreenConfigOptions;
  medium?: ScreenConfigOptions;
  small?: ScreenConfigOptions;
};

export type ScreenSize = "large" | "medium" | "small";