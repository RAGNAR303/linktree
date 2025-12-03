import { PiWarningCircleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center text-center
    gap-3 text-white"
    >
      <h1 className="text-6xl font-extrabold flex items-center text-red-400">
        4{" "}
        <span className="text-5xl">
          <PiWarningCircleBold />
        </span>
        4
      </h1>
      <p className="uppercase text-3xl font-bold italic ">
        ops! não encontramos essa página
      </p>
      <Link
        className="text-2xl text-gray-800 font-bold bg-emerald-500 px-6 py-1 rounded-3xl hover:scale-105 
        duration-300"
        to={"/"}
      >
        Retornar para Home
      </Link>
    </div>
  );
}
