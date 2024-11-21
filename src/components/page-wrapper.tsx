import PageHelmet from './page-helmet.tsx';

export const PageWrapper = ({
  children,
  title,
  description
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <>
      <PageHelmet title={title} description={description} />
      {children}
    </>
  );
};