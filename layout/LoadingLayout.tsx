function LoadingLayout({
  children,
  isLoading,
  skeleton,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
}) {
  return <>{isLoading ? skeleton : children}</>;
}

export default LoadingLayout;
