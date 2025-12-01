import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Social } from "../../components/social";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface linksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SociaProps {
  facebook: string;
  github: string;
  linkedin: string;
}

export function Home() {
  const [links, setLinks] = useState<linksProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SociaProps>();

  useEffect(() => {
    function loadLinks() {
      const linkRef = collection(db, "links");
      const queryRef = query(linkRef, orderBy("created", "asc"));

      const unsublinks = onSnapshot(queryRef, (snapshot) => {
        const list = [] as linksProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            bg: doc.data().bg,
            color: doc.data().color,
            name: doc.data().name,
            url: doc.data().url,
          });
        });

        setLinks(list);
        console.log(list);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocial() {
      const socialRef = doc(db, "social", "link");
      await getDoc(socialRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            linkedin: snapshot.data()?.linkedin,
            github: snapshot.data()?.github,
          });
        }
      });
    }

    loadSocial();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center gap-2.5 ">
      <h1 className="text-3xl md:text-4xl text-gradient from-green-400 to-emerald-600 font-extrabold mt-10">
        Thiago Gonçalves
      </h1>
      <p className="text-2xl md:text-3xl text-gray-300 font-bold ">
        Desenvolvedor Front-End
      </p>
      <span className="text-xl md:text-2xl text-gray-400 mb-5 animate-bounce">
        👇Veja meus Links👇
      </span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            className={` mb-4 w-full py-2 rounded-md select-none transition-all hover:scale-105 duration-300`}
            style={{ background: link.bg, color: link.color }}
          >
            <a href={link.url} target="_blank">
              <p className="text-black text-2xl font-bold">{link.name}</p>
            </a>
          </section>
        ))}

        {socialLinks && (
          <footer className="flex justify-center gap-2.5">
            <Social url={socialLinks.github}>
              <FaGithub className="text-3xl text-blue-800" />
            </Social>
            <Social url={socialLinks.facebook}>
              <FaFacebook className="text-3xl text-blue-500" />
            </Social>
            <Social url={socialLinks.linkedin}>
              <FaLinkedin className="text-3xl text-blue-500" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
