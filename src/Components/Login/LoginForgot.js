import React from "react";
import { FORGOT_PASSWORD } from "../../api";
import Error from "../../Helper/Error";
import Head from "../../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Form/Button";
import Input from "../Form/Input";

const LoginForgot = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    console.log(window.location.href);
    event.preventDefault();

    console.log(window.location.href);
    const { url, options } = FORGOT_PASSWORD({
      login: login.value,
      url: window.location.href.replace("forgot", "reset"),
    });
    const { json } = await request(url, options);
    console.log(json);
  }

  return (
    <section className="animeLeft">
      <Head
        title="Esqueceu a senha"
        description={`Página para recuperar senha`}
      />
      <h1 className="title">Esqueceu a senha?</h1>
      {data ? (
        <p style={{ color: "#4b1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" name="login" type="text" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar email</Button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default LoginForgot;
