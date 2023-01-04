const Layout = ({ header, children, footer }) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">{header}</div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl ">{footer}</div>
      </div>
    </div>
  );
};

export default Layout;
