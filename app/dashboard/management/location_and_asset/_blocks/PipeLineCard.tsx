"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  LuPlus,
  LuArrowLeft,
  LuRefreshCcw,
  LuX,
  LuSaveAll,
  LuArrowRight,
} from "react-icons/lu";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type stateType = "process" | "complete" | "pending";

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

export function PipeLineStepContent({
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
  isDisabled?: boolean;
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
      {back !== null && !back.isHidden ? (
        <Button
          key={Math.random().toString() + "back"}
          disabled={back.isDisabled}
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
      ) : (
        <div className="w-full"></div>
      )}
      <Button
        key={Math.random().toString() + "next"}
        disabled={next?.isDisabled}
        variant={isFormSubmitAction ? "default" : "ghost"}
        type={isFormSubmitAction ? "submit" : "button"}
        onClick={next.onClick ?? (() => {})}
        className={cn(
          "flex flex-row space-x-2 justify-start items-center",
          isFormSubmitAction ? "bg-primary text-white" : "text-primary"
        )}
      >
        <p>{next.label}</p>
        {next.icon}
      </Button>
    </div>
  );
}

export function PipeLineCard({
  initStep = 0,
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
      {/* <CardHeader>
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
        </CardHeader> */}
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
          isFormSubmitAction={currentStep === length - 1}
          isHidden={false}
          back={{
            label: "上一步",
            icon: <LuArrowLeft />,
            isHidden: currentStep === 0,
            onClick: () => {
              currentStep > 0
                ? setCurrentStep(currentStep - 1)
                : setCurrentStep(0);
            },
          }}
          next={{
            label: currentStep === length - 1 ? "送出" : "下一步",
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
