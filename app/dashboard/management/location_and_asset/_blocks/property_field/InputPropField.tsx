import {
  focusSettings,
  hoverSettings,
  InputFieldProps,
  ReferenceFieldProps,
} from "@/app/dashboard/management/location_and_asset/_blocks/property_field/FieldInterface";
import { useFormContext } from "react-hook-form";
import { useDataQueryRoute } from "../../_hooks/useQueryRoute";
import { useDocumentReference } from "../../_hooks/useDocument";
import {
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LuLock } from "react-icons/lu";

export function InputPropField({
  name,
  placeholder = "空值",
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  inputType = "text",
  textCss,
}: InputFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-row justify-start items-center">
          <FormControl>
            <Input
              type={inputType}
              readOnly={isDisabled}
              className={cn(
                'w-full text-md border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                focusSettings,
                hoverSettings,
                textCss
              )}
              {...field}
              placeholder={placeholder}
              required={isRequired}
            />
          </FormControl>
          {isDisabled ? <LuLock /> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
