import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./UserHeader.module.css";
import UserHeaderNav from "./UserHeaderNav";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/my-account/stats":
        setTitle("Estatísticas");
        break;
      case "/my-account/post":
        setTitle("Poste sua foto");
        break;
      default:
        setTitle("Minhas fotos");
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
