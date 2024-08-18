"use client";

import { Suspense } from "react";
import { DocumentGroupType } from "@/domain/entities/Document";
import { DocumentPage } from "./_blocks/DocumentPage";

export default function Page() {
  return (
    <Suspense>
      <DocumentPage />
    </Suspense>
  );
}
