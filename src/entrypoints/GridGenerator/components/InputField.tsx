import {
  Button,
  CaretDownIcon,
  CaretUpIcon,
  Dropdown,
  DropdownMenu,
  DropdownOption,
  TextField,
} from "datocms-react-ui";
import { ScreenConfigOptions, ScreenSize } from "../types";

type InputFieldProps = {
  config: ScreenConfigOptions;
  screenSize: ScreenSize;
  onChange: (newValue: ScreenConfigOptions) => void;
};

const OFFSET_SLOTS = 12;

export function InputField({ config, screenSize, onChange }: InputFieldProps) {
  const capitalizedScreenSize = screenSize.charAt(0).toUpperCase() + screenSize.slice(1);

  const handleValueChange = (newValue: string) => {
    if (!newValue || !Number.isNaN(Number.parseInt(newValue))) {
      onChange({ ...config, value: newValue });
    }
  };

  const handleOffsetChange = (index: number) => {
    if (!index) {
      return onChange({ ...config, offset: "" });
    }
    onChange({ ...config, offset: (index + 1).toString() });
  };

  return (
    <div>
      <TextField
        name={screenSize}
        id={screenSize}
        label={`${capitalizedScreenSize} screens`}
        value={config.value}
        placeholder={capitalizedScreenSize}
        onChange={handleValueChange}
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
          {Array.from({ length: OFFSET_SLOTS }).map((_, index) => (
            <DropdownOption
              key={index}
              onClick={() => handleOffsetChange(index)}
              active={config.offset === (index + 1).toString()}
            >
              {index ? `By ${index + 1}` : "Default"}
            </DropdownOption>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}