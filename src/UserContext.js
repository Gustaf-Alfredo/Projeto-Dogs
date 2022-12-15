import React from "react";
import { useNavigate } from "react-router-dom";
import { GET_USER, TOKEN_POST } from "./api";

export const UserContext = React.createContext();
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const nav = useNavigate();

  const logout = React.useCallback(() => {
    setData(null);
    setLogin(false);
    setLoading(false);
    setError(null);
    window.localStorage.removeItem("token");
    nav("/login");
  }, [nav]);

  async function getUser(token) {
    const { url, options } = GET_USER(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function loginUser(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
      const { token } = await response.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = GET_USER(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          setError(err.message);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [logout]);

  return (
    <UserContext.Provider
      value={{ loginUser, logout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
