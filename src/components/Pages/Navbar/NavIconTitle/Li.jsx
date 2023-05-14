import "./Li.css";


const Li = ({ Icon, title, onClick }) => {
  return (
    <div className="nav" onClick={onClick}>
      {Icon && <Icon className="icon" />}
      <h2>{title ? title : null}</h2>
    </div>
  );
};

export default Li;