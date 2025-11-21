import { ScreenConfigOptions } from "../types";
import { InputField } from "./InputField";

type ScreenConfigInputsProps = {
  large?: ScreenConfigOptions;
  medium?: ScreenConfigOptions;
  small?: ScreenConfigOptions;
  onLargeChange: (value: ScreenConfigOptions) => void;
  onMediumChange: (value: ScreenConfigOptions) => void;
  onSmallChange: (value: ScreenConfigOptions) => void;
};

export function ScreenConfigInputs({
  large,
  medium,
  small,
  onLargeChange,
  onMediumChange,
  onSmallChange,
}: Readonly<ScreenConfigInputsProps>) {
  return (
    <>
      {large && <div>
        <InputField screenSize="large" config={large} onChange={onLargeChange} />
      </div>}
      {medium && <div>
        <InputField screenSize="medium" config={medium} onChange={onMediumChange} />
      </div>}
      {small && <div>
        <InputField screenSize="small" config={small} onChange={onSmallChange} />
      </div>}
    </>
  );
}