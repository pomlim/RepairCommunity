const Layout = ({ header, children, footer }) => {
  return (
    <div className="flex flex-col w-full">
      {header}
      {children}
    </div>
  );
};

export default Layout;
