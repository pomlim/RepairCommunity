const Layout = ({ header, children, footer }) => {
  return (
    <div className="flex flex-col w-full">
      {header}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
