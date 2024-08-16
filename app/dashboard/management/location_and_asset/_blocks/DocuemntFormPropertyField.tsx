import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  OptionsProperty,
  Property,
  PropertyType,
} from "@/domain/entities/DocumentProperty";
import { cn } from "@/lib/utils";
import { SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { LuLock } from "react-icons/lu";
import { InfoBlock } from "./DocumentDataCard";
import { Status } from "@/domain/entities/Status";
import { StatusChip } from "@/components/blocks/chips";
import React, { Key } from "react";

// shdcn UI Kit css disable
const focusSettings =
  "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-background focus-visible:shadow-lg";
const hoverSettings = "hover:bg-secondary";

type DocumentPropFieldProps = {
  name: string;
  placeholder?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  textCss?: string;
};

export function getPropertyValue(property: Property, index?: number) {
  if (property === undefined) {
    return null;
  } else {
    switch (property.type as PropertyType) {
      case PropertyType.text:
        return (
          <InfoBlock label={property.name}>
            <DashboardInputField
              isRequired={property.required}
              name={`properties.${index}.value`}
              isDisabled={property.readonly}
            />
          </InfoBlock>
        );
      case PropertyType.number:
        return (
          <InfoBlock label={property.name}>
            <DashboardInputField
              isRequired={property.required}
              name={`properties.${index}.value`}
              isDisabled={property.readonly}
            />
          </InfoBlock>
        );
      case PropertyType.options:
        return (
          <InfoBlock label={property.name}>
            <DashboardSelectionField
              isRequired={property.required}
              name={`properties.${index}.value`}
              items={(property as OptionsProperty).options.map(
                (option: string, index: Key | null | undefined) => {
                  return (
                    <SelectItem key={index} value={option} className="py-2">
                      {option}
                    </SelectItem>
                  );
                }
              )}
              isDisabled={property.readonly}
            />
          </InfoBlock>
        );
      case PropertyType.dateTime:
        return (
          <InfoBlock label={property.name}>
            <DashboardDatePickerField
              isRequired={property.required}
              name={`properties.${index}.value`}
              isDisabled={property.readonly}
            />
          </InfoBlock>
        );
      case PropertyType.status:
        return (
          <InfoBlock label={property.name}>
            <DashboardSelectionField
              isRequired={property.required}
              name={`properties.${index}.value`}
              isDisabled={property.readonly}
              items={Object.keys(Status).map(
                (status: string, index: Key | null | undefined) => {
                  return (
                    <SelectItem key={index} value={status} className="py-2">
                      <StatusChip
                        status={Status[status as keyof typeof Status]}
                      />
                    </SelectItem>
                  );
                }
              )}
            />
          </InfoBlock>
        );
      default:
        return null;
    }
  }
}
export function DashboardInputField({
  name,
  placeholder = "空值",
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  textCss,
}: DocumentPropFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-row justify-start items-center">
          <FormControl>
            <Input
              readOnly={isDisabled}
              className={cn(
                'w-full text-sm font-semibold border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                focusSettings,
                hoverSettings,
                textCss
              )}
              {...field}
              placeholder={placeholder}
              required={isRequired}
              // disabled={isDisabled}
            />
          </FormControl>
          {isDisabled ? <LuLock /> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function DashboardSelectionField({
  name,
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  items,
  textCss,
}: DocumentPropFieldProps & { items: React.ReactNode[] }) {
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
                    'w-full text-sm font-semibold border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
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
              <SelectContent>{...items}</SelectContent>
            </Select>
          </FormControl>
          {isDisabled ? <LuLock /> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function DashboardDatePickerField({
  name,
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  textCss,
}: DocumentPropFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full text-sm font-semibold border-0 bg-transparent px-2 py-1 m-0",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>選擇日期</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 " align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
