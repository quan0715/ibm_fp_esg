import {
  CheckBoxFieldProps,
  focusSettings,
  hoverSettings,
  InputFieldProps,
  ReferenceFieldProps,
  SelectionFieldProps,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function DashboardSelectionField({
  name,
  isDisabled = false,
  isRequired = false,
  options,
  textCss,
}: SelectionFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Select
              disabled={isDisabled}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    'w-full text-sm font-normal border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                    focusSettings,
                    hoverSettings,
                    textCss
                  )}
                >
                  <SelectValue
                    className="w-full"
                    placeholder="Select a verified email to display"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {...options.map((option, index) => (
                  <SelectItem key={index} value={option.value} className="py-2">
                    {option.component ?? option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {isDisabled ? <LuLock /> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
