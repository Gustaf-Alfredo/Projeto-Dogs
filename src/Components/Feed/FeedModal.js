import React from "react";
import { GET_PHOTO_MODAL } from "../../api";
import styles from "./FeedModal.module.css";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import useFetch from "../../Hooks/useFetch";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = GET_PHOTO_MODAL(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
