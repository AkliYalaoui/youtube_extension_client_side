import { BsInfoLg } from "react-icons/bs";

const Alert = ({ color, msg }) => {
  return (
    <div

      className={`flex items-center ${color} text-white text-sm font-bold px-4 py-3 max-w-lg mx-auto my-4 rounded`}
      role="alert"
    >
      <div className="fill-current w-4 h-4 mr-2">
        <BsInfoLg />
      </div>
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
