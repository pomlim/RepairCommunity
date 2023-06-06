const Layout = ({ header, children, footer }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {header}
      {children}
    </div>
  );
};

export default Layout;
