import "./ProductCard.css";
function ProductCard({ item }) {
  console.log(item, "itemmm");
  return (
    <div className="card-container">
      {item ? <img src={item.thumbnail} alt="image" /> : null}
      <p>{item.title}</p>
      <p>${item.price}</p>
    </div>
  );
}

export default ProductCard;
