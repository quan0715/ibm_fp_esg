import React from "react";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
      <div className={"flex min-h-screen flex-col items-center justify-stretch self-stretch"}>
          <AuthBackgroundSurface>
          {children}
          </AuthBackgroundSurface>
      </div>
  );
}

function AuthBackgroundSurface({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className= "relative flex min-h-screen justify-center items-center self-stretch bg-[url('/background.png')]  bg-repeat bg-contain bg-center">
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50"></div>
            {children}
        </div>
    );
}
