import React from "react";
import { UserContext } from "../../UserContext";
import styles from "./UserHeaderNav.module.css";
import { ReactComponent as Feed } from "../../Assets/feed.svg";
import { ReactComponent as Post } from "../../Assets/adicionar.svg";
import { ReactComponent as Logout } from "../../Assets/sair.svg";
import { NavLink, useLocation } from "react-router-dom";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const [mobileMenu, setMobileMenu] = React.useState(null);
  const { logout } = React.useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");
  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink
          to="/my-account"
          className={(navData) => (navData.isActive ? styles.active : "")}
          end
        >
          <Feed />
          {mobile && "Minhas fotos"}
        </NavLink>

        <NavLink
          to="/my-account/post"
          className={(navData) => (navData.isActive ? styles.active : "")}
        >
          <Post />
          {mobile && "Postar foto"}
        </NavLink>

        <button onClick={logout}>
          <Logout />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
