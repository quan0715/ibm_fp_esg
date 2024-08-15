"use client";
import {
  DashboardCard,
  DashboardCardActionList,
  DashboardCardContent,
  DashboardCardHeader,
  DashboardCardHeaderContent,
  DashboardCardHeaderDescription,
  DashboardCardHeaderTitle,
} from "@/app/dashboard/_components/DashboardCard";
import {
  DocumentGroupType,
  DocumentObject,
  getDocumentChildrenTypeOptions,
  getDocumentLayerRules,
  getDocumentType,
  OptionsProperty,
  Property,
  PropertyType,
} from "@/domain/entities/Document";
import { motion } from "framer-motion";
import { EditButton } from "./buttons";
import { CreateNewDataButton, DeleteDialog } from "./DataCRUDTrigger";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  colorVariants,
  getDocumentEntityUIConfig,
  getDocumentTypeColor,
} from "../_utils/locationTypeUIConfig";
import { useContext, createContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuLink, LuLoader2, LuLock, LuUnlock } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewData, updateData } from "../_actions/DocumentAction";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useDocumentData } from "../_hooks/useDocument";
import { MobileOnly } from "@/components/layouts/layoutWidget";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type DocumentDataCardProps = {
  data: DocumentObject;
  // color?: keyof typeof colorVariants;
  groupType: DocumentGroupType;
  className?: string;
  childData?: DocumentObject[];
};

const ThemeContext = createContext(colorVariants["blue"]);

export function DocumentDataCardForm({
  data,
  childData = [],
  groupType,
  className,
}: DocumentDataCardProps) {
  // const [doc, setDocument] = useState<DocumentObject>(data);
  const colorTheme = getDocumentTypeColor(data.type);
  const queryPathService = useDataQueryRoute();

  const isCreatingNewData = queryPathService.mode === "create";
  const dataQueryService = useDocumentData(groupType);

  const form = useForm<DocumentObject>({
    defaultValues: data,
  });

  async function onSubmit(values: DocumentObject) {
    console.log("submit");
    let newData = {
      ...values,
      updateAt: new Date(),
      updateBy: "admin",
    } as DocumentObject;

    if (isCreatingNewData) {
      const newDataId = await dataQueryService.createNewDocument(newData);
      if (newDataId) {
        queryPathService.setAssetId(newDataId);
      }
      return;
    } else {
      await dataQueryService.updateDocument(newData);

      form.reset({
        ...newData,
      });
      queryPathService.refresh();
    }
  }

  async function onDelete() {
    try {
      const returnIndex = await dataQueryService.deleteDocument(data.id!);
      queryPathService.setAssetId(returnIndex);
    } catch (e) {
      console.error("presentation: deleteData error", e);
    }
  }

  const reset = () => {
    if (isCreatingNewData) {
      // form.reset();
      queryPathService.moveBack();
    } else {
      form.reset(data);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ThemeContext.Provider value={colorTheme}>
            <DashboardCard className="shadow-sm w-full min-h-screen ">
              <DashboardCardHeader>
                <DashboardCardHeaderContent>
                  <DashboardInputField
                    name="title"
                    isRequired={true}
                    textCss={cn("text-lg font-semibold", colorTheme.textColor)}
                  ></DashboardInputField>
                  <DashboardInputField
                    name="description"
                    textCss={cn("text-sm font-semibold")}
                  ></DashboardInputField>
                  {isCreatingNewData ? null : (
                    <div className="flex flex-row items-center justify-start space-x-2 px-2">
                      {/* <StaticAttrChip
                        label="建立時間"
                        value={data.createAt.toLocaleDateString()}
                      />
                      <Separator
                        orientation="vertical"
                        className="h-6 hidden md:block"
                      /> */}
                      <StaticAttrChip
                        label="上次編輯時間"
                        value={
                          data.updateAt.toLocaleDateString() +
                          " " +
                          data.updateAt.toLocaleTimeString()
                        }
                      />
                      <Separator
                        orientation="vertical"
                        className="h-6 hidden md:block"
                      />
                      {/* <StaticAttrChip label="建立者" value={data.createBy} />
                      <Separator
                        orientation="vertical"
                        className="h-6 hidden md:block"
                      /> */}
                      <StaticAttrChip
                        label="上次修改者"
                        value={data.updateBy}
                      />
                    </div>
                  )}
                </DashboardCardHeaderContent>
                <DashboardCardActionList>
                  {!isCreatingNewData && data.id ? (
                    <DeleteDialog
                      onDelete={onDelete}
                      isDisabled={childData.length > 0}
                      isDeleting={dataQueryService.isDeletingData}
                    />
                  ) : null}
                  <MobileOnly>{/* <DisplayMenuDialog /> */}</MobileOnly>
                </DashboardCardActionList>
              </DashboardCardHeader>
              <Separator />
              <DashboardCardContent className="flex flex-col space-y-2">
                <PropertiesDisplay properties={data.properties} />
                <Separator />
                <MultiChildrenBlock
                  label="子資產"
                  child={childData}
                  parent={data}
                />
                <Separator />
                <div
                  className={"flex flex-row justify-end items-center space-x-2"}
                >
                  <Button
                    disabled={
                      isCreatingNewData
                        ? false
                        : form.formState.isSubmitting || !form.formState.isDirty
                    }
                    type="button"
                    size="lg"
                    variant={"outline"}
                    onClick={reset}
                  >
                    {isCreatingNewData ? "取消" : "重設"}
                  </Button>
                  <Button
                    disabled={
                      form.formState.isSubmitting || !form.formState.isDirty
                    }
                    type="submit"
                    variant={"outline"}
                    className={cn(colorTheme.textColor)}
                    size="lg"
                  >
                    <>
                      {!isCreatingNewData ? "更新" : "新增"}
                      {form.formState.isSubmitting ? (
                        <LuLoader2 className="animate-spin" />
                      ) : null}
                    </>
                  </Button>
                </div>
              </DashboardCardContent>
            </DashboardCard>
          </ThemeContext.Provider>
        </form>
      </Form>
    </motion.div>
  );
}

export function PropertiesDisplay({ properties }: { properties: Property[] }) {
  const form = useFormContext();
  const propsField = useFieldArray({
    name: "properties",
    control: form.control,
  });
  return (
    <div className="w-full grid grid-cols-1 justify-between h-fit gap-2">
      {propsField.fields.map((field, index) => {
        return (
          <div className="w-full flex flex-row flex-1" key={field.id}>
            {getPropertyValue(properties[index], index)}
          </div>
        );
      })}
    </div>
  );
}

function getPropertyValue(property: Property, index?: number) {
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
              selection={(property as OptionsProperty).options}
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

      default:
        return null;
    }
  }
}

function InfoBlock({
  label,
  className,
  orientation = "vertical",
  children,
}: {
  label: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}) {
  const colorTheme = useContext(ThemeContext);
  return orientation === "horizontal" ? (
    <div className={cn("flex flex-col justify-start items-start", className)}>
      <p className={cn(colorTheme.textColor, "text-sm font-normal")}>{label}</p>
      {children}
    </div>
  ) : (
    <div
      className={cn(
        "w-full grid grid-cols-7 py-1 gap-2 grid-flow-col",
        className
      )}
    >
      <div
        className={cn(
          colorTheme.textColor,
          "col-span-1 flex flex-rol justify-between items-center text-sm font-normal"
        )}
      >
        {label}
        <Separator orientation="vertical" className="h-8 hidden md:block" />
      </div>

      <div className="col-span-6 flex flex-col justify-center items-start">
        {children}
      </div>
    </div>
  );
}

function MultiChildrenBlock<T extends DocumentObject>({
  label,
  child,
  parent,
  className,
}: {
  parent: DocumentObject;
  label: string;
  child: T[];
  labelColor?: string;
  className?: string;
}) {
  const queryPathService = useDataQueryRoute();
  const layerRule = getDocumentLayerRules(parent.type);
  const childrenOptions = getDocumentChildrenTypeOptions(
    parent.type,
    layerRule.group
  );
  return (
    <InfoBlock label={label} className={cn(className)}>
      <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {childrenOptions.map((type) => (
          <CreateNewDataButton
            key={type}
            className={cn(
              "w-full rounded-md border h-fit",
              getDocumentTypeColor(type).textColor
            )}
            onClick={async () => {
              let newAncestors =
                parent.ancestors.length > 0
                  ? parent.ancestors + "," + parent.id
                  : parent.id;
              if (newAncestors) {
                queryPathService.createNewAsset(type, newAncestors);
              }
            }}
            label={getDocumentEntityUIConfig(type).label}
          />
        ))}
        {child.map((child, index) => {
          return (
            <DocumentChildrenBlock
              onClick={() => queryPathService.setAssetId(child.id!)}
              key={child.title + index}
              document={child}
            />
          );
        })}
        {childrenOptions.length === 0 && child.length === 0 ? (
          <p className={"text-sm text-gray-500 font-semibold"}>無下層資料</p>
        ) : null}
      </div>
    </InfoBlock>
  );
}

export function DocumentChildrenBlock({
  className = "",
  onClick,
  document,
}: {
  className?: string;
  // href: string;
  onClick?: () => void;
  document: DocumentObject;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "w-full h-full flex flex-row justify-between items-center",
        className
      )}
    >
      <p>{document.title}</p>
      <LuLink />
    </Button>
  );
}

export function StaticAttrChip({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const colorTheme = useContext(ThemeContext);

  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center pr-2 rounded-md"
      )}
    >
      <div>
        <p className={cn("flex-0 text-sm text-gray-400")}>{label}</p>
      </div>
      <div>
        <p className={cn("pl-2 text-sm text-gray-800 dark:text-gray-500")}>
          {value}
        </p>
      </div>
    </div>
  );
}

function DashboardInputField({
  name,
  placeholder = "空值",
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  textCss,
}: {
  textCss?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  placeholder?: string;
}) {
  const focusSettings =
    "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-background focus-visible:shadow-lg";
  const hoverSettings = "hover:bg-secondary";

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

function DashboardSelectionField({
  name,
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  selection,
  textCss,
}: {
  textCss?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  selection: string[];
}) {
  const focusSettings =
    "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-background focus-visible:shadow-lg";
  const hoverSettings = "hover:bg-secondary";

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
              <SelectContent>
                {selection.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
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

function DashboardDatePickerField({
  name,
  isHidden = false,
  isDisabled = false,
  isRequired = false,
  textCss,
}: {
  textCss?: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
}) {
  const focusSettings =
    "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-background focus-visible:shadow-lg";
  const hoverSettings = "hover:bg-secondary";

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
                    'w-full text-sm font-semibold border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                    !field.value && "text-muted-foreground",
                    focusSettings,
                    hoverSettings
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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
