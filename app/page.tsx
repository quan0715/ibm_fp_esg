import Image from "next/image";
import NavBar from "@/app/ui/components/nav_bar";
import React from "react";
import {MaterialIcon} from "@/app/ui/components/MaterialIcon";
import {Input, Button, Card, CardBody} from "@nextui-org/react";
import {permanentRedirect} from "next/navigation";
import {TextButton} from "@/app/ui/components/TextButton";
import {PrimaryButton, SecondaryButton} from "@/app/ui/components/PrimaryButton";

const formTitle = "智慧永續 ESG 平台";

export default function Auth() {

    permanentRedirect(`/auth`)

    return (
        <>頁面施工中</>
    );
}