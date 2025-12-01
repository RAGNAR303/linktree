import { signOut } from "firebase/auth";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";

export function Header() {
  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <header className="flex items-center justify-center  w-full max-w-3xl mt-2.5">
      <nav
        className="bg-linear-180 from-gray-50 to-gray-400 w-full max-w-3xl
       rounded-3xl px-6 py-2 flex justify-between shadow-2xl   "
      >
        <ul className="flex gap-4 md:text-xl  font-medium ">
          <Link className=" hover:scale-[1.05] duration-300" to={"/"}>
            Home
          </Link>
          <Link className=" hover:scale-[1.05] duration-300" to={"/admin"}>
            Links
          </Link>
          <Link
            className=" hover:scale-[1.05] duration-300"
            to={"/admin/social"}
          >
          Redes Social
          </Link>
        </ul>
        <button
          onClick={handleSignOut}
          className=" hover:scale-[1.10] duration-300 text-2xl md:text-3xl text-red-400 hover:text-red-600 transition-all"
        >
          <LiaSignOutAltSolid />
        </button>
      </nav>
    </header>
  );
}
