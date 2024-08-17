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
  DocumentReferenceProperty,
  OptionsProperty,
  Property,
  PropertyType,
} from "@/domain/entities/DocumentProperty";
import { cn } from "@/lib/utils";
import { SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { LuLoader, LuLoader2, LuLock, LuSearch } from "react-icons/lu";
import { InfoBlock } from "./DocumentDataCard";
import { Status } from "@/domain/entities/Status";
import { StatusChip } from "@/components/blocks/chips";
import React, { Key } from "react";
import { DocumentGroupType } from "@/domain/entities/Document";
import {
  useDocument,
  useDocumentData,
  useDocumentReference,
} from "../_hooks/useDocument";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DocumentCardView,
  DocumentDataAncestorView,
  DocumentReferencePropertyView,
} from "./DocumentDataDisplayUI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";

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
      case PropertyType.reference:
        return (
          <InfoBlock label={property.name}>
            <DocumentReferenceField
              isRequired={property.required}
              name={`properties.${index}.value`}
              isDisabled={property.readonly}
              referenceGroup={
                (property as DocumentReferenceProperty).referenceGroup
              }
              referenceIndex={(property as DocumentReferenceProperty).value}
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

function DocumentReferenceField({
  name,
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  textCss,
  referenceGroup,
  referenceIndex = "",
}: DocumentPropFieldProps & {
  referenceGroup: DocumentGroupType;
  referenceIndex?: string;
}) {
  const { control, ...form } = useFormContext();
  const useQueryRoute = useDataQueryRoute();
  const documentOptions = useDocumentReference(referenceGroup);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const isBlocking = documentOptions.isFetchingData;
        const data = documentOptions.documentList?.find(
          (doc) => doc.id === field.value
        );

        const options = documentOptions.documentList?.filter(
          (doc) => doc.id !== data?.id
        );

        return (
          <FormItem className="w-full flex flex-row justify-start items-center">
            <FormControl>
              <div
                className={cn(
                  "w-full flex flex-row justify-start items-center space-x-2 rounded-md py-0.5 px-1",
                  hoverSettings
                )}
              >
                {!isBlocking && data ? (
                  <DocumentReferencePropertyView
                    data={data}
                    onClick={() => {
                      // console.log("click: select document", document.title);
                      useQueryRoute.setAssetId(data.id!, "location");
                    }}
                    mode="display"
                  />
                ) : (
                  <LoadingWidget />
                  // <LuLoader2 className="animate-spin h-4 w-4 text-gray-500" />
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    {field.value ? (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-gray-500"
                        size="icon"
                      >
                        <LuSearch />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-gray-500"
                      >
                        <span>+ 新增關聯</span>
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新增關聯</DialogTitle>
                      <DialogDescription>選擇你要關聯的文檔</DialogDescription>
                    </DialogHeader>
                    {documentOptions.isFetchingData ? (
                      <Skeleton className="w-100">
                        <LoadingWidget />
                      </Skeleton>
                    ) : (
                      <div className="w-full flex flex-col justify-start items-start space-y-4">
                        {data ? (
                          <div
                            className={cn(
                              // !data ? "hidden" : "block",
                              "w-full flex flex-col justify-start items-start space-y-2"
                            )}
                          >
                            <p className={cn("text-sm")}>已選擇的文檔</p>

                            <DialogClose asChild>
                              <Button type="button" variant="secondary" asChild>
                                <DocumentReferencePropertyView
                                  data={data}
                                  onClick={() => {
                                    // console.log("click: select document", document.title);
                                    // onReferenceChange("");
                                    field.onChange("");
                                    // DialogClose();
                                  }}
                                  mode="selected"
                                />
                              </Button>
                            </DialogClose>
                          </div>
                        ) : null}

                        <div
                          className={cn(
                            "w-full flex flex-col justify-start items-start space-y-2"
                          )}
                        >
                          <p className="text-sm">選擇其他文檔</p>
                          {(options ?? [])?.map((document) => (
                            <DialogClose asChild key={document.id}>
                              <Button type="button" variant="secondary" asChild>
                                <DocumentReferencePropertyView
                                  data={document}
                                  onClick={() => {
                                    // console.log("click: select document", document.title);
                                    // onReferenceChange(document.id!);
                                    field.onChange(document.id!);
                                  }}
                                  mode="candidate"
                                />
                              </Button>
                            </DialogClose>
                          ))}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </FormControl>
            {isDisabled ? <LuLock /> : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
