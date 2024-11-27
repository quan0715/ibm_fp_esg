function MobileOnly({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`block md:hidden ${className}`}>
      {children ?? "mobile only block"}
    </div>
  );
}

function DesktopOnly({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`hidden md:block ${className}`}>
      {children ?? "desktop only block"}
    </div>
  );
}

export { MobileOnly, DesktopOnly };
