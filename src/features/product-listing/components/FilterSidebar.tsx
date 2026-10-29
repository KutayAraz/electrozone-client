interface FilterSidebarProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSidebar = ({ title, children }: FilterSidebarProps) => (
  <div className="sticky hidden w-48 shrink-0 flex-col overflow-y-auto sm:top-39 sm:flex sm:h-[calc(100vh-180px)] md:top-28 md:h-[calc(100vh-136px)] md:w-60">
    <h3 className="mb-3 mt-4 text-xl font-bold">{title}</h3>

    {children}
  </div>
);
