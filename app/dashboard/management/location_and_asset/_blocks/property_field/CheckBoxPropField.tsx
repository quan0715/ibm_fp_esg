import {
  CheckBoxFieldProps,
  focusSettings,
  hoverSettings,
  InputFieldProps,
  ReferenceFieldProps,
} from "@/app/dashboard/management/location_and_asset/_blocks/property_field/FieldInterface";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LuLock } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckBoxPropField({
  name,
  isDisabled = false,
  isRequired = false,
  textCss,
}: CheckBoxFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-row items-start space-x-3 space-y-0 px-2">
          <FormControl>
            <Checkbox
              className={cn(
                "data-[state=checked]:bg-stone-900 border-stone-900",
                "data-[state=checked]:text-white",
                "w-5 h-5"
              )}
              {...field}
              disabled={isDisabled}
              checked={field.value}
              onCheckedChange={field.onChange}
              required={isRequired}
            />
          </FormControl>
          <div
            className={
              "leading-none h-full flex flex-col items-center justify-center"
            }
          >
            <FormLabel className="text-sm font-semibold">
              {field.value ? "是" : "否"}
            </FormLabel>
          </div>
          {isDisabled ? <LuLock /> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
