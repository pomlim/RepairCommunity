const Card = ({ children, className = '' }) => {
  return (
    <>
      <div className="w-56 shadow-xl card bg-base-100">
        <div className={`card-body ${className}`}>{children}</div>
      </div>
    </>
  );
};

export default Card;
