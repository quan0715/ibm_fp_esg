'use client';
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {LuPlus, LuArrowLeft, LuRefreshCcw, LuSaveAll, LuArrowRight} from "react-icons/lu";
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Page() {
  return (
      // <div className={"w-full h-full flex flex-col justify-center items-center p-4 bg-secondary"}>
      //     <p className={"text-primary text-2xl font-light"}> Data Page. To be continue</p>
      // </div>
      <div className={"w-full h-full flex flex-col justify-start items-start space-y-2"}>
          <div className={"w-full flex flex-row rounded-xl shadow-sm p-3 bg-background space-x-2"}>
              <Button size={"icon"} variant={"ghost"}>
                  <LuArrowLeft></LuArrowLeft>
              </Button>
              <Separator orientation="vertical"/>

              <Dialog>
                  <DialogTrigger asChild>
                      <Button variant={"ghost"} className={"text-primary"}>
                        <LuPlus/>
                        添加新資料
                      </Button>
                  </DialogTrigger>
                  <DialogContent className={"transition-all duration-500 ease-linear"}>

                      <DialogHeader>
                          <DialogTitle>添加新資料</DialogTitle>
                          <DialogDescription>
                              請依步驟添加新的廢水資料
                          </DialogDescription>
                      </DialogHeader>
                      <PipeLineCard initStep={0}>
                          <PipeLineStepContent title={"Step1"} description={"第一步介紹 ....."}>
                              <div className={"w-full"}>
                                  <Label>資料1</Label>
                                  <Input title={"輸入資料1"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>
                              <div className={"w-full"}>
                                  <Label>資料2</Label>
                                  <Input title={"輸入資料2"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>
                              <div className={"w-full"}>
                                  <Label>資料2</Label>
                                  <Input title={"輸入資料2"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>
                          </PipeLineStepContent>
                          <PipeLineStepContent title={"Step2"} description={"接下來 ....."}>
                              <div className={"w-full"}>
                                  <Label>資料1</Label>
                                  <Input title={"輸入資料1"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>
                              <div className={"w-full"}>
                                  <Label>資料2</Label>
                                  <Input title={"輸入資料2"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>

                          </PipeLineStepContent>
                          <PipeLineStepContent title={"Step3"} description={"完成 ....."}>
                              <div className={"w-full"}>
                                  <Label>資料1</Label>
                                  <Input title={"輸入資料1"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>
                              <div className={"w-full"}>
                                  <Label>資料2</Label>
                                  <Input title={"輸入資料2"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>

                          </PipeLineStepContent>
                          <PipeLineStepContent title={"Step4"} description={"完成 ....."}>
                              <div className={"w-full"}>
                                  <Label>資料1</Label>
                                  <Input title={"輸入資料1"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>
                              <div className={"w-full"}>
                                  <Label>資料2</Label>
                                  <Input title={"輸入資料2"}/>
                                  <Label className={"text-gray-500 text-sm "}>資料1介紹</Label>
                              </div>

                          </PipeLineStepContent>
                      </PipeLineCard>

                  </DialogContent>
              </Dialog>

              <Separator orientation="vertical"/>
              <Button size={"icon"} variant={"ghost"}>
                  <LuRefreshCcw></LuRefreshCcw>
              </Button>
              <Separator orientation="vertical"/>
              <Button size={"icon"} variant={"ghost"}>
                  <LuSaveAll></LuSaveAll>
              </Button>
          </div>
          <div
              className={"w-full h-full flex flex-col justify-center items-center rounded-xl shadow-sm p-3 bg-background space-x-2"}>
              <div className={'relative flex flex-col w-[512px] h-[512px] overflow-clip'}>

                  <Image src={'/no_data.png'} alt={'no data'} width={'840'} height={'512'} className={"object-center"}/>
                  {/*<p className={'absolute bottom-12 right-12'}>無資料</p>*/}
              </div>

          </div>
      </div>

  );
}

type stateType = "process" | "complete" | "pending"
function StepNumberIcon({number, state} : {number: number, state: stateType}){
    const color = state === "process" ? "bg-blue-600" : state === "complete" ? "bg-green-600" : "bg-gray-300";
    return (
        <div className={cn(
            "flex flex-row justify-center items-center rounded-xl w-8 h-8 text-white",
            color
            )}>
            <p className={"text-md font-semibold"}>{number}</p>
        </div>
    )

}

function PipeLineStepContent({title, description, children}: {title: string, description: string, children?: React.ReactNode}){
    return (
        <div className={"w-full flex flex-col justify-start items-start space-y-2"}>
            <div>
                <p className={"text-lg font-semibold"}>
                    {title}
                </p>
                <p className={"text-sm text-gray-500"}>{description}</p>
            </div>
            {children}

        </div>
    )
}

type ActionsProps = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isHidden?: boolean;
};
export function ActionBar({
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


function PipeLineCard({initStep, children}: {initStep: number, children?: React.ReactNode}) {
    const length = React.Children.count(children);
    const numberArray = Array.from({length: length}, (_, i) => i + 1);

    const [currentStep, setCurrentStep] = useState(initStep);

    return (
        <Card>
            <CardHeader>
                <div className={"w-full flex flex-row justify-between items-center"}>
                    {
                        Array.from({length: length}, (_, i) => i + 1).map((number) => {
                            return (
                                <>
                                    <StepNumberIcon key={number} number={number}
                                                    state={number - 1 <= currentStep ? number-1===currentStep ? "process" : "complete": "pending"}></StepNumberIcon>
                                    {number !== length && <Separator orientation="horizontal" className={"w-24"}/>}
                                </>
                            )
                        })
                    }
                </div>
            </CardHeader>
            <CardContent>
                <div className={"w-full h-full flex flex-col justify-center items-center py-4"}>
                    {React.Children.map(children, (child, index) => {
                        return index === currentStep ? child : null
                    })}
                </div>
            </CardContent>
            <CardFooter>
                <ActionBar
                    isFormSubmitAction={false}
                    isHidden={false}
                    back={{
                        label: "上一步",
                        icon: <LuArrowLeft/>,
                        onClick: () => {currentStep > 0 ? setCurrentStep(currentStep - 1) : setCurrentStep(0)}
                    }}
                    next={{
                        label: "下一步",
                        icon: <LuArrowRight/>,
                        onClick: () => {currentStep < length - 1 ? setCurrentStep(currentStep + 1) : setCurrentStep(length - 1)}
                    }}
                />
            </CardFooter>
        </Card>
    )
}
