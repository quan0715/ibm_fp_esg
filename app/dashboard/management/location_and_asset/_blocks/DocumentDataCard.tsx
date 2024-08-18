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
  Property,
} from "@/domain/entities/Document";
import { motion } from "framer-motion";
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
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useDocumentData } from "../_hooks/useDocument";
import { DesktopOnly, MobileOnly } from "@/components/layouts/layoutWidget";
import {
  DashboardInputField,
  getPropertyValue,
} from "./DocuemntFormPropertyField";
import {
  getDocumentChildrenTypeOptions,
  getDocumentLayerRules,
} from "@/domain/entities/DocumentConfig";
import { DocumentNavigateMenuDialog } from "./DocumentNavigationMenu";
import { DocumentReferencePropertyView } from "./DocumentDataDisplayUI";

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
                    <DesktopOnly>
                      <div className="flex flex-row items-center justify-start space-x-2 px-2">
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

                        <StaticAttrChip
                          label="上次修改者"
                          value={data.updateBy}
                        />
                      </div>
                    </DesktopOnly>
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
                  <MobileOnly>
                    <DocumentNavigateMenuDialog data={data} />
                  </MobileOnly>
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

export function InfoBlock({
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
        <Separator orientation="vertical" className="min-h-8 hidden md:block" />
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
      <div className="w-full grid  grid-cols-1">
        {child.map((child, index) => {
          return (
            <DocumentReferencePropertyView
              key={child.id}
              data={child}
              onClick={() => queryPathService.setAssetId(child.id!)}
              mode={"display"}
            />
          );
        })}
        {childrenOptions.length === 0 && child.length === 0 ? (
          <p className={"text-sm text-gray-500 font-semibold"}>無下層資料</p>
        ) : null}
        {queryPathService.mode === "create"
          ? null
          : childrenOptions.map((type) => (
              <CreateNewDataButton
                key={type}
                className={cn(
                  "w-fit rounded-md h-fit",
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
