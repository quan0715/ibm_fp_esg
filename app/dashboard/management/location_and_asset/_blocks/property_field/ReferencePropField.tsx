import { ReferenceFieldProps } from "@/app/dashboard/management/location_and_asset/_blocks/property_field/FieldInterface";
import { useFormContext } from "react-hook-form";
import { useDataQueryRoute } from "../../_hooks/useQueryRoute";
import { useDocumentReference } from "../../_hooks/useDocument";
import {
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { DocumentObject } from "@/domain/entities/Document";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LuLock, LuPlus, LuSearch } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { DocumentReferencePropertyView } from "../DocumentDataDisplayUI";
import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

function SearchButton({ isEmpty = false }: { isEmpty?: boolean }) {
  const buttonProps = {
    type: "button",
    variant: "ghost",
    className: "text-gray-600 gap-2",
  } as {
    type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  };
  return !isEmpty ? (
    <Button {...buttonProps}>
      <LuSearch /> 修改關聯
    </Button>
  ) : (
    <Button {...buttonProps}>
      <LuPlus /> 添加關聯
    </Button>
  );
}

function PropsLoadingWidget() {
  return (
    <Skeleton className="w-full">
      <LoadingWidget />
    </Skeleton>
  );
}

export function DocumentReferenceField({
  name,
  isDisabled = false,
  referenceGroup,
  limit = false,
}: ReferenceFieldProps) {
  const { control, ...form } = useFormContext();
  const useQueryRoute = useDataQueryRoute();
  const documentOptions = useDocumentReference(referenceGroup);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected: DocumentObject[] =
          documentOptions.documentList?.filter((doc) =>
            field.value.includes(doc.id)
          ) ?? [];

        const options =
          documentOptions.documentList?.filter(
            (doc) => !field.value.includes(doc.id)
          ) ?? [];

        const onReferenceAdd = (documentId: string) => {
          field.onChange(limit ? [documentId] : [...field.value, documentId]);
        };

        const onReferenceRemove = (documentId: string) => {
          field.onChange(
            limit
              ? []
              : selected
                  .filter((selectedDoc) => selectedDoc.id !== documentId)
                  .map((data) => data.id)
          );
        };
        const isReferenceEmpty = !field.value || field.value.length === 0;
        const isBlocking = documentOptions.isFetchingData;

        return (
          <FormItem className="w-full flex flex-row justify-start items-center">
            <FormControl>
              <div
                className={cn(
                  "w-full flex flex-col justify-start items-start space-x-2 rounded-md py-0.5"
                )}
              >
                <Dialog>
                  <DialogTrigger className="w-full flex flex-row justify-start items-center rounded-md">
                    <SearchButton isEmpty={isReferenceEmpty} />
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>新增關聯</DialogTitle>
                      <DialogDescription>選擇你要關聯的文檔</DialogDescription>
                    </DialogHeader>
                    {isBlocking ? (
                      <PropsLoadingWidget />
                    ) : (
                      <div className="w-full flex flex-col justify-start items-start space-y-2 max-h-[500px]">
                        <div className={cn("w-full grid gap-1 overflow-auto")}>
                          <Label>已選擇的文檔</Label>
                          {selected.map((document) => {
                            return (
                              <motion.div
                                key={document.id}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={{
                                  initial: { opacity: 0, y: -20, x: -20 },
                                  animate: { opacity: 1, y: 0, x: 0 },
                                  exit: { opacity: 0, y: 20, x: 20 },
                                }}
                              >
                                <DialogCloseWrapper wrapped={limit}>
                                  <DocumentReferencePropertyView
                                    data={document}
                                    onClick={() => {
                                      onReferenceRemove(document.id ?? "");
                                    }}
                                    mode="selected"
                                  />
                                </DialogCloseWrapper>
                              </motion.div>
                            );
                          })}
                        </div>
                        <div className={cn("w-full grid gap-1 overflow-auto")}>
                          <Label>選擇其他文檔</Label>
                          {options.map((document) => {
                            return (
                              <motion.div
                                key={document.id}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={{
                                  initial: { opacity: 0, y: 20, x: 20 },
                                  animate: { opacity: 1, y: 0, x: 0 },
                                  exit: { opacity: 0, y: -20, x: -20 },
                                }}
                              >
                                <DialogCloseWrapper wrapped={limit}>
                                  <DocumentReferencePropertyView
                                    data={document}
                                    onClick={() => {
                                      onReferenceAdd(document.id ?? "");
                                    }}
                                    mode="candidate"
                                  />
                                </DialogCloseWrapper>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                {!isReferenceEmpty && isBlocking ? (
                  <PropsLoadingWidget />
                ) : (
                  <div className="w-full h-fit grid grid-cols-1">
                    {selected.map((data) => {
                      return (
                        <DocumentReferencePropertyView
                          key={data.id}
                          data={data}
                          onClick={() => {
                            useQueryRoute.setAssetId(
                              data.id ?? "",
                              referenceGroup
                            );
                          }}
                          mode="display"
                        />
                      );
                    })}
                  </div>
                )}
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

function DialogCloseWrapper({
  wrapped,
  children,
}: {
  wrapped: boolean;
  children: React.ReactNode;
}) {
  return wrapped ? (
    <DialogClose className="w-full">{children}</DialogClose>
  ) : (
    <>{children}</>
  );
}
