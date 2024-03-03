import { forwardRef, useEffect, useId } from "react";
import { Switch as AriaSwitch, SwitchProps } from "react-aria-components";
import {
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { cn } from "../../utilities/cn";

interface ISwitch extends SwitchProps {
  defaultValue?: boolean;
  control?: any;
  children?: React.ReactNode;
  LeftContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
  RightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}

const Switch = forwardRef<HTMLLabelElement, ISwitch>(
  (
    {
      defaultValue = null,
      control,
      children,
      value,
      onChange,
      name = "",
      LeftContainer,
      RightContainer,
      className,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    let field: ControllerRenderProps<FieldValues, string> | null = null;

    if (control) {
      const controller = useController({
        name,
        control,
      });

      field = controller.field;
    }

    return (
      <div className={cn(`flex items-center gap-2`, className)}>
        <label
          htmlFor={id}
          className="block cursor-pointer text-xs font-medium text-gray-800 sm:text-sm"
        >
          {children}
        </label>

        <AriaSwitch
          id={id}
          ref={ref}
          isSelected={defaultValue !== null ? defaultValue : field?.value}
          onChange={(e) => {
            field?.onChange(e);
            onChange && typeof onChange === "function" && onChange(e);
          }}
          {...rest}
          className="disable-highlight group inline-flex touch-none items-center"
        >
          {LeftContainer && <LeftContainer />}
          <span className="h-7 w-11 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 outline-none ring-offset-2 ring-offset-white transition duration-200 group-data-[selected]:bg-skin-primary group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-skin-primary">
            <span className="block h-6 w-6 origin-right rounded-full bg-white shadow transition-all duration-200 group-data-[selected]:group-data-[pressed]:ml-3 group-data-[selected]:ml-4 group-data-[pressed]:w-7" />
          </span>
          {RightContainer && <RightContainer />}
        </AriaSwitch>
      </div>
    );
  }
);

Switch.displayName = "Switch";
export default Switch;
