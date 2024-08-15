interface DashboardPageHeader {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

export function DashboardPageHeader({
  title = "Dashboard",
  subTitle,
  children,
}: DashboardPageHeader) {
  return (
    <div className="flex w-full py-4 px-8 items-center justify-between bg-default">
      <span className="text-3xl font-light">
        {title}
        {subTitle && <span className="text-xl font-light">/ {subTitle}</span>}
      </span>

      <div className="gap-10 hidden md:flex">{children}</div>
    </div>
  );
}
