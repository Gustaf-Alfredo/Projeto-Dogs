import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../../UserContext";
import LoginForgot from "./LoginForgot";
import LoginForm from "./LoginForm";
import LoginRegister from "./LoginRegister";
import LoginReset from "./LoginReset";
import styles from "./Login.module.css";
import NotFound from "../NotFound";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login) return <Navigate to="/my-account" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<LoginRegister />} />
          <Route path="forgot" element={<LoginForgot />} />
          <Route path="reset" element={<LoginReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
