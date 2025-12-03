import { PiWarningCircleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center text-center
    gap-3 text-white"
    >
      <h1 className="text-6xl font-extrabold flex text-red-400">
        4<PiWarningCircleBold />4
      </h1>
      <p className="uppercase text-3xl font-bold ">
        ops! não encontramos essa página
      </p>
      <Link
        className="text-2xl text-gray-800 font-bold bg-emerald-500 px-6 py-1 rounded-3xl hover:scale-105 
        duration-300"
        to={"/"}
      >
        Retornar
      </Link>
    </div>
  );
}
