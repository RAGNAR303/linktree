import { useEffect, useState, type FormEvent } from "react";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { Button } from "../../components/button";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function NetWorks() {
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    async function loadLinks() {
      const socialRef = doc(db, "social", "link");
      await getDoc(socialRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data()?.facebook);
            setLinkedin(snapshot.data()?.linkedin);
            setGithub(snapshot.data()?.github);
          }
        })
        .catch((error) => {
          console.log("ERRO E CARREGAR LIKNS" + error);
        });
    }

    loadLinks();
  }, []);

  function handleSocial(e: FormEvent) {
    e.preventDefault();
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      linkedin: linkedin,
      github: github,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO");
      })
      .catch((error) => {
        console.log("ERRO EM CASDATRAR" + error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen">
      <form
        onSubmit={handleSocial}
        className="flex flex-col max-w-xl w-full mt-5 gap-2"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Sua redes sociais
        </h1>
        <div>
          <Label>Link url Linkedin</Label>
          <Input
            placeholder="Digite URL facebook"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div>
          <Label>Link url FaceBook</Label>
          <Input
            placeholder="Digite URL facebook"
            type="url"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>
        <div>
          <Label>Link url GitHub</Label>
          <Input
            placeholder="Digite URL Youtube"
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <Button>Cadastrar</Button>
      </form>
    </div>
  );
}
