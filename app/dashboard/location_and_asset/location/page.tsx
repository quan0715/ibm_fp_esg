"use client";

import { TabsContent } from "@/components/ui/tabs";

function TempPage({ title }: { title: string }) {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1>{`${title} 施工中`}</h1>
    </div>
  );
}

export default function Page() {
  return <h1>TEST</h1>;
}
