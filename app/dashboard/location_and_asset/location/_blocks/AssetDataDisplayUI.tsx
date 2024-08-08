import { LocationType } from "@/domain/entities/LocationType";
import {
  colorVariants,
  getAssetEntityInfo,
} from "../_utils/locationTypeUIConfig";
import { StatusChip } from "@/components/blocks/chips";
import { Status } from "@/domain/entities/Status";
import {
  ChildAttributeButton,
  DataCard,
  layoutsConfigType,
  MultiChildrenLayout,
} from "./DataCard";

export function AssetDataCard({ ...props }: {}) {
  const colorVariant =
    colorVariants[getAssetEntityInfo(LocationType.none).color];

  const layoutConfig: layoutsConfigType = {
    sections: [
      {
        rows: [
          {
            blocks: [
              {
                label: "狀態",
                children: <StatusChip status={Status.ACTIVE} />,
              },
            ],
          },
          {
            blocks: [
              {
                label: "Product",
                value: "Product A",
              },
            ],
          },
          {
            blocks: [
              {
                label: "有效開始日期",
                value: new Date().toLocaleDateString(),
              },
              {
                label: "有效結束日期",
                value: new Date().toLocaleDateString(),
              },
              {
                label: "啟用日期",
                value: new Date().toLocaleDateString(),
              },
              {
                label: "停運日期",
                value: new Date().toLocaleDateString(),
              },
            ],
          },
        ],
      },
      {
        rows: [
          {
            blocks: [
              {
                label: "位置資料",
                children: (
                  <MultiChildrenLayout>
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"System 1"}
                    />
                  </MultiChildrenLayout>
                ),
              },
            ],
          },
        ],
      },
      {
        rows: [
          {
            blocks: [
              {
                label: "子資產",
                children: (
                  <MultiChildrenLayout>
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component1"}
                    />
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component2"}
                    />
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component3"}
                    />
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component4"}
                    />
                  </MultiChildrenLayout>
                ),
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <DataCard
      colorTheme={{
        bgColor: colorVariant.bgColor,
        leadingColor: colorVariant.leadingColor,
        textColor: colorVariant.textColor,
        borderColor: "border-gray-200",
      }}
      title={"tool"}
      description={"this is a tool"}
      layoutConfig={layoutConfig}
    />
  );
}
