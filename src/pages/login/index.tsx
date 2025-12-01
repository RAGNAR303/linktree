import { useState, type FormEvent } from "react";
import { Input } from "../../components/input";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handlerSubmit(e: FormEvent) {
    e.preventDefault(); // não atualiza a tela quando dar "submit"

    if (email === "" || password === "") {
      alert("Preencha os campos para continuar");
      return;
    }
    console.log({ password: password, email: email });
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
        console.log("Logado com sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      className="h-screen  flex flex-col items-center
     justify-center gap-4"
    >
      <h1 className="text-5xl bg-linear-to-r from-gray-200 to-gray-700 bg-clip-text text-transparent font-extrabold">
        Dev
        <span className="bg-linear-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          Links
        </span>
      </h1>
      <form
        onSubmit={handlerSubmit}
        className={`w-full max-w-md flex h-1/3 items-center justify-center 
        flex-col gap-2.5`}
      >
        <Input
          placeholder="Digite seu E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="*********************"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Acessar</Button>
      </form>
    </div>
  );
}
