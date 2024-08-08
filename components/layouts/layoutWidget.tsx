function MobileOnly({ children }: { children?: React.ReactNode }) {
  return (
    <div className="block md:hidden">{children ?? "mobile only block"}</div>
  );
}

function DesktopOnly({ children }: { children?: React.ReactNode }) {
  return (
    <div className="hidden md:block">{children ?? "desktop only block"}</div>
  );
}

export { MobileOnly, DesktopOnly };
