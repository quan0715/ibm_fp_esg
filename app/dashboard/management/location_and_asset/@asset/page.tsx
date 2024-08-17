"use client";

import { Suspense } from "react";
import { DocumentPage } from "../_blocks/DocumentPage";
import { DocumentGroupType } from "@/domain/entities/Document";

export default function Page() {
  return (
    <Suspense>
      <DocumentPage />
    </Suspense>
  );
}
