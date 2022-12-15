import React from "react";
import styles from "./PhotoDelete.module.css";
import useFetch from "../../Hooks/useFetch";
import { DELETE_PHOTO } from "../../api";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm("Deseja realmente deletar a publicação");

    if (confirm) {
      const token = window.localStorage.getItem("token");
      const { url, options } = DELETE_PHOTO(id, token);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
