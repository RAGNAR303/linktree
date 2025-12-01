import { IoLinkSharp } from "react-icons/io5";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useEffect, useState, type FormEvent } from "react";
import { BsTrash } from "react-icons/bs";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Label } from "../../components/label";

interface linksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urInput, setInputLink] = useState("");
  const [urlColor, setUrlColor] = useState("#ffffff");
  const [urlBackgraund, setUrlBackgraund] = useState("#1f1f1f1");
  const [listUrl, setListUrl] = useState<linksProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc")); // busca personalizada => por data

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as linksProps[];
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

   
      setListUrl(list);
    });

    return () => {
      unsub(); // desmontar componente quando sair
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nameInput === "" || urInput === "") {
      alert("Preencha os campos para continuar");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urInput,
      color: urlColor,
      bg: urlBackgraund,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setInputLink("");
        alert("Cadastrado com sucesso");
      })
      .catch((error) => console.log(error));
  }

  async function handleDelete(id: string) {
    const linkRef = doc(db, "links", id);
    await deleteDoc(linkRef);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full max-h-screen">
      <form
        onSubmit={handleRegister}
        className="flex flex-col max-w-xl w-full mt-5 gap-2 "
      >
        <div>
          <Label>Nome do link</Label>
          <Input
            placeholder="Digite o nome do link"
            value={nameInput}
            type="text"
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div>
          <Label>URL do link</Label>
          <Input
            placeholder="Digite a URL"
            type="url"
            value={urInput}
            onChange={(e) => setInputLink(e.target.value)}
          />
        </div>
        <section className="flex items-center justify-center gap-2.5">
          <div className="flex gap-2 items-center">
            <Label>Texto do link</Label>
            <input
              type="color"
              name="color-text"
              id="color-text"
              value={urlColor}
              onChange={(e) => setUrlColor(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label>Fundo do link</Label>
            <input
              type="color"
              name="color-background"
              id="color-background"
              value={urlBackgraund}
              onChange={(e) => setUrlBackgraund(e.target.value)}
            />
          </div>
        </section>

        {nameInput && (
          <main className="flex justify-center max-w-xl w-full mt-4">
            <div className="m-auto w-full text-center border border-gray-500 p-2 rounded-md">
              <Label>Veja a prévia</Label>
              <article
                className="w-full bg-gray-700 rounded-md p-2 mt-3 "
                style={{ background: urlBackgraund, color: urlColor }}
              >
                <p className="text-white font-medium">{nameInput}</p>
              </article>
            </div>
          </main>
        )}

        <Button type="submit">
          Adiconar
          <IoLinkSharp className="text-3xl" />
        </Button>
      </form>
      <main className="flex justify-center max-w-xl w-full mt-4">
        <div className="m-auto w-full text-center p-2 rounded-md">
          <Label>Meus Links</Label>
          {listUrl &&
            listUrl.map((link) => (
              <article
                className=" flex items-center justify-between w-full bg-gray-700 rounded-md py-2 px-5 mt-3 select-none "
                style={{ background: `${link.bg}` }}
                key={link.id}
              >
                <a href={link.url} target="_blank">
                  <p
                    className="text-white font-medium"
                    style={{ color: `${link.color}` }}
                  >
                    {link.name}
                  </p>
                </a>

                <button
                  onClick={() => handleDelete(link.id)}
                  className="border border-dashed p-1 rounded-md bg-gray-700"
                >
                  <BsTrash className="text-red-50 hover:text-red-600 duration-300" />
                </button>
              </article>
            ))}
        </div>
      </main>
    </div>
  );
}
