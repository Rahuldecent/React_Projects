import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css"

export default function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(url) {
    try {
      setLoading(true);
      const result = await fetch(`${url}?page=${page}&limit=${limit}`);
      const response = await result.json();

      if (response) {
        console.log(response, "responsee");
        setImages(response);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error");
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url != "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading Data Please Wait ...</div>;
  }

  if (error != null) {
    return <div>Some Error Occured {error}</div>;
  }

  return (
    <div className="container">
      {/* <img src=""/> */}
      <BsArrowLeftCircleFill className="arrow arrow-left" />
      {images && images.length
        ? images.map((imagesItem) => (
            <img
              id={imagesItem.id}
              alt={imagesItem.download_url}
              src={imagesItem.download_url}
              className="current-image"
            />
          ))
        : null}
      <BsArrowRightCircleFill className="arrow arrow-right" />
      <span className="circle-indicator">{images && images.length ? 
      images.map((_,index) => (
        <button key={index} className="current-indicator"></button>
      ) )
      :null}</span>
    </div>
  );
}
