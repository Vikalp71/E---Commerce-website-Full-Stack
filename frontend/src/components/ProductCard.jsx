import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./components.css";

const getProductImage = (src) => {
  if (!src) return "/images/electronics.jpg";
  return src.startsWith("/src/assets/images/")
    ? src.replace("/src/assets/images/", "/images/")
    : src;
};

export default function ProductCard({ p }) {
  const { change } = useCart();
  const { user } = useAuth();
  return (
    <article className="card">
      <img src={getProductImage(p.image)} alt={p.name} />
      <div>
        <small>{p.category?.name}</small>
        <h3>{p.name}</h3>
        <p>{p.description?.slice(0, 70)}</p>
        <b>₹{p.discountPrice || p.price}</b>
        {p.discountPrice && <del> ₹{p.price}</del>}
        <div className="actions">
          <Link className="btn secondary" to={"/products/" + p._id}>
            Details
          </Link>
          {user && (
            <button
              className="btn"
              disabled={!p.stock}
              onClick={() => change(p._id, 1)}
            >
              {p.stock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
