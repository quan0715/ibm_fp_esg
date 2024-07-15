"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  LuPlus,
  LuArrowLeft,
  LuRefreshCcw,
  LuSaveAll,
  LuArrowRight,
} from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fakeOrgData, OrgDataCard } from "./_blocks/DataCard";

function ToolBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "h-12 w-full flex flex-row items-center justify-start rounded-xl shadow-sm p-2 bg-background space-x-2"
      }
    >
      {
        // append space between children
        React.Children.map(children, (child, index) => {
          return (
            <>
              {child}
              {index !== React.Children.count(children) - 1 && (
                <Separator orientation="vertical" />
              )}
            </>
          );
        })
      }
    </div>
  );
}

export default function Page() {
  const data = fakeOrgData;
  return (
    <div
      className={
        "w-full h-fit flex flex-col justify-start items-start space-y-2"
      }
    >
      <ToolBar>
        <CreateDataDialog />
        <Button size={"icon"} variant={"ghost"}>
          <LuRefreshCcw></LuRefreshCcw>
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <LuSaveAll></LuSaveAll>
        </Button>
      </ToolBar>
      {data.length > 0 ? (
        <div className={"w-full h-fit grid grid-cols-2 gap-4 "}>
          {data.map((data) => {
            return <OrgDataCard orgData={data} key={data.org}></OrgDataCard>;
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
}

type stateType = "process" | "complete" | "pending";

function DataNotFound() {
  return (
    <div
      className={
        "w-full  flex flex-col justify-center items-center rounded-xl shadow-sm p-3 bg-background space-x-2"
      }
    >
      <div
        className={
          "relative flex flex-col items-center justify-center overflow-clip"
        }
      >
        <p
          className={
            "absolute bottom-12 font-mono text-lg font-semibold text-gray-500"
          }
        >
          查無資料請點擊左上角新增資料
        </p>
        <Image
          src={"/no_data.png"}
          alt={"no data"}
          width={"600"}
          height={"512"}
          className={"object-center"}
        />
      </div>
    </div>
  );
}

function CreateDataDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={"text-primary"}>
          <LuPlus />
          添加新組織資料
        </Button>
      </DialogTrigger>
      <DialogContent className={"transition-all duration-500 ease-linear"}>
        <DialogHeader>
          <DialogTitle>添加新組織資料</DialogTitle>
          <DialogDescription>請依步驟添加新的添加新組織資料</DialogDescription>
        </DialogHeader>
        <PipeLineCard initStep={0}>
          <PipeLineStepContent title={"組織基本資料"} description={""}>
            <div className={"w-full"}>
              <Label>組織名稱</Label>
              <Input title={"組織名稱"} />
              <Label className={"text-gray-500 text-sm "}>組織名稱</Label>
            </div>
            <div className={"w-full"}>
              <Label>組織備註</Label>
              <Input title={"組織備註"} />
              <Label className={"text-gray-500 text-sm "}>
                組織備註不可超過200個字
              </Label>
            </div>
            {/* <div className={"w-full"}>
              <Label>資料2</Label>
              <Input title={"輸入資料2"} />
              <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
            </div> */}
          </PipeLineStepContent>
          <PipeLineStepContent title={"組織位置資料"} description={""}>
            <div className={"w-full"}>
              <Label>經度</Label>
              <Input title={"經度"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
            <div className={"w-full"}>
              <Label>緯度</Label>
              <Input title={"緯度"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
            <div className={"w-full"}>
              <Label>zip code</Label>
              <Input title={"緯度"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
            <div className={"w-full"}>
              <Label>country</Label>
              <Input title={"country"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
            <div className={"w-full"}>
              <Label>city</Label>
              <Input title={"city"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
            <div className={"w-full"}>
              <Label>addressLine1</Label>
              <Input title={"addressLine1"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
            <div className={"w-full"}>
              <Label>addressLine2</Label>
              <Input title={"addressLine2"} />
              {/* <Label className={"text-gray-500 text-sm "}>資料1介紹</Label> */}
            </div>
          </PipeLineStepContent>
          <PipeLineStepContent title={"添加廠區"} description={""}>
            <div className={"w-full"}>
              <Label>廠區1</Label>
              <Input title={"廠區1"} />
            </div>
            <div className={"w-full"}>
              <Label>廠區2</Label>
              <Input title={"廠區2"} />
            </div>
            <div className={"w-full"}>
              <Label>廠區3</Label>
              <Input title={"廠區3"} />
            </div>
            <div>
              <Button variant={"outline"}>添加廠區</Button>
            </div>
          </PipeLineStepContent>
          {/* <PipeLineStepContent title={"Step4"} description={"完成 ....."}>
            <div className={"w-full"}>
              <Label>資料1</Label>
              <Input title={"輸入資料1"} />
              <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
            </div>
            <div className={"w-full"}>
              <Label>資料2</Label>
              <Input title={"輸入資料2"} />
              <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
            </div>
          </PipeLineStepContent> */}
        </PipeLineCard>
      </DialogContent>
    </Dialog>
  );
}

function StepNumberIcon({
  number,
  state,
}: {
  number: number;
  state: stateType;
}) {
  const color =
    state === "process"
      ? "bg-blue-600"
      : state === "complete"
        ? "bg-green-600"
        : "bg-gray-300";
  return (
    <div
      className={cn(
        "flex flex-row justify-center items-center rounded-xl w-8 h-8 text-white",
        color
      )}
    >
      <p className={"text-md font-semibold"}>{number}</p>
    </div>
  );
}

function PipeLineStepContent({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={"w-full flex flex-col justify-start items-start space-y-2"}>
      <div>
        <p className={"text-lg font-semibold"}>{title}</p>
        <p className={"text-sm text-gray-500"}>{description}</p>
      </div>
      {children}
    </div>
  );
}

type ActionsProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isHidden?: boolean;
};
function ActionBar({
  isFormSubmitAction = false,
  isHidden = false,
  back = null,
  next,
}: {
  isFormSubmitAction?: boolean;
  isHidden?: boolean;
  back: ActionsProps | null;
  next: ActionsProps;
}) {
  return isHidden ? null : (
    <div className={"w-full flex flex-row justify-between items-center "}>
      {back !== null ? (
        <Button
          variant={"ghost"}
          type={"button"}
          onClick={back.onClick ?? (() => {})}
          className={
            "flex flex-row space-x-2 justify-start items-center text-primary hover:text-primary"
          }
        >
          {back.icon}
          <p className={"text-primary"}>{back.label}</p>
        </Button>
      ) : null}
      <Button
        variant={"default"}
        type={!isFormSubmitAction ? "button" : "submit"}
        onClick={next.onClick ?? (() => {})}
        className={"flex flex-row space-x-2 justify-start items-center"}
      >
        <p>{next.label}</p>
        {next.icon}
      </Button>
    </div>
  );
}

function PipeLineCard({
  initStep,
  children,
}: {
  initStep: number;
  children?: React.ReactNode;
}) {
  const length = React.Children.count(children);
  const numberArray = Array.from({ length: length }, (_, i) => i + 1);

  const [currentStep, setCurrentStep] = useState(initStep);

  return (
    <Card>
      <CardHeader>
        <div className={"w-full flex flex-row justify-between items-center"}>
          {Array.from({ length: length }, (_, i) => i + 1).map((number) => {
            return (
              <>
                <StepNumberIcon
                  key={number}
                  number={number}
                  state={
                    number - 1 <= currentStep
                      ? number - 1 === currentStep
                        ? "process"
                        : "complete"
                      : "pending"
                  }
                ></StepNumberIcon>
                {number !== length && (
                  <Separator orientation="horizontal" className={"w-24"} />
                )}
              </>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={
            "w-full h-full flex flex-col justify-center items-center py-4"
          }
        >
          {React.Children.map(children, (child, index) => {
            return index === currentStep ? child : null;
          })}
        </div>
      </CardContent>
      <CardFooter>
        <ActionBar
          isFormSubmitAction={false}
          isHidden={false}
          back={{
            label: "上一步",
            icon: <LuArrowLeft />,
            onClick: () => {
              currentStep > 0
                ? setCurrentStep(currentStep - 1)
                : setCurrentStep(0);
            },
          }}
          next={{
            label: "下一步",
            icon: <LuArrowRight />,
            onClick: () => {
              currentStep < length - 1
                ? setCurrentStep(currentStep + 1)
                : setCurrentStep(length - 1);
            },
          }}
        />
      </CardFooter>
    </Card>
  );
}
