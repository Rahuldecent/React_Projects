import { useEffect, useState } from "react";
import "./style.css";
import ProductCard from "./ProductCard";

function LoadMoreData() {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setloading(true);
      const result = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const response = await result.json();
      console.log(response.products, "products");
      if (response && response.products && response.products.length) {
        setProducts((prev) => [...prev, ...response.products]);
        setloading(false);
      }
    } catch (error) {
      setErrorMsg(error.response);
      setloading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length > 100) {
      setDisableButton(true);
    }
  }, [products]);

  if (loading) {
    return <div>Please Wait Data Loading</div>;
  }
  return (
    <div className="load-more-container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button
          disabled={disableButton}
          onClick={() => setCount((prev) => prev + 1)}
        >
          Load More Button
        </button>

        {disableButton ? (
          <p>You Have reached the limit to 100 products</p>
        ) : null}
      </div>
    </div>
  );
}

export default LoadMoreData;
