import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


export default function Checkout() {
  const { total, cart } = useCart();
  const nav = useNavigate();

  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setErr("");

    if (!cart.items?.length) {
      setErr("Your cart is empty");
      return;
    }

    const d = Object.fromEntries(new FormData(e.target));

    if (!/^[6-9]\d{9}$/.test(d.phone)) {
      setErr("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!/^\d{6}$/.test(d.pincode)) {
      setErr("Please enter a valid 6-digit pincode");
      return;
    }

    const shippingAddress = {
      fullName: d.fullName.trim(),
      phone: d.phone,
      address: d.address.trim(),
      city: d.city.trim(),
      state: d.state.trim(),
      pincode: d.pincode,
    };

    nav("/payment", {
      state: {
        shippingAddress,
        paymentMethod: d.paymentMethod,
        total,
      },
    });
  };

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        {/* Header */}
        <div className="checkout-header">
          <div>
            <span className="checkout-label">SECURE CHECKOUT</span>
            <h1>Complete Your Order</h1>
            <p>Enter your delivery details and choose your preferred payment method.</p>
          </div>

          <div className="secure-badge">
            <span>🔒</span>
            <div>
              <strong>Secure Checkout</strong>
              <small>Your information is protected</small>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="checkout-progress">
          <div className="progress-step active">
            <span>1</span>
            <p>Cart</p>
          </div>

          <div className="progress-line active"></div>

          <div className="progress-step active">
            <span>2</span>
            <p>Checkout</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>3</span>
            <p>Payment</p>
          </div>
        </div>

        <form onSubmit={submit} className="checkout-grid">

          {/* LEFT SIDE */}
          <div className="checkout-left">

            {/* Shipping Address */}
            <div className="checkout-card">
              <div className="card-heading">
                <div className="heading-icon">📍</div>
                <div>
                  <h2>Delivery Address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              {err && (
                <div className="checkout-error">
                  <span>⚠️</span>
                  {err}
                </div>
              )}

              <div className="form-grid">

                <div className="form-group full">
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="input-with-icon">
                    <span>📱</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      inputMode="numeric"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <div className="input-with-icon">
                    <span>📮</span>
                    <input
                      name="pincode"
                      placeholder="6-digit pincode"
                      maxLength="6"
                      inputMode="numeric"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group full">
                  <label>Complete Address</label>
                  <textarea
                    name="address"
                    placeholder="House / Flat no., Street, Area..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    name="state"
                    placeholder="Enter state"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Payment */}
            <div className="checkout-card payment-card">
              <div className="card-heading">
                <div className="heading-icon">💳</div>
                <div>
                  <h2>Payment Method</h2>
                  <p>Choose how you want to pay</p>
                </div>
              </div>

              <div className="payment-options">

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    defaultChecked
                  />

                  <div className="payment-icon cod-icon">
                    💵
                  </div>

                  <div className="payment-info">
                    <strong>Cash on Delivery</strong>
                    <span>Pay when your order arrives</span>
                  </div>

                  <div className="radio-circle"></div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                  />

                  <div className="payment-icon online-icon">
                    💳
                  </div>

                  <div className="payment-info">
                    <strong>Online Payment</strong>
                    <span>UPI, Cards, Net Banking & more</span>
                  </div>

                  <div className="radio-circle"></div>
                </label>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <aside className="checkout-right">

            <div className="order-summary">

              <div className="summary-header">
                <div>
                  <span className="summary-label">YOUR ORDER</span>
                  <h2>Order Summary</h2>
                </div>

                <span className="item-count">
                  {cart.items?.length || 0} Items
                </span>
              </div>

              <div className="summary-products">

                {cart.items?.map((item) => (
                  <div className="summary-product" key={item.product?._id || item._id}>

                    <div className="product-image">
                      <img
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.name || "Product"}
                      />
                    </div>

                    <div className="product-details">
                      <h4>{item.product?.name || "Product"}</h4>

                      <span>
                        Qty: {item.quantity}
                      </span>

                      <strong>
                        ₹{(item.product?.price || 0) * item.quantity}
                      </strong>
                    </div>

                  </div>
                ))}

              </div>

              <div className="summary-divider"></div>

              <div className="price-row">
                <span>Subtotal</span>
                <strong>₹{total}</strong>
              </div>

              <div className="price-row">
                <span>Delivery</span>
                <strong className="free">FREE</strong>
              </div>

              <div className="price-row">
                <span>Tax</span>
                <strong>Included</strong>
              </div>

              <div className="summary-divider"></div>

              <div className="total-row">
                <div>
                  <span>Total Amount</span>
                  <small>Inclusive of all taxes</small>
                </div>

                <strong>₹{total}</strong>
              </div>

              <button type="submit" className="place-order-btn">
                Continue to Payment
                <span>→</span>
              </button>

              <div className="secure-message">
                🔒 Safe & Secure Payment
              </div>

            </div>

            <div className="checkout-benefits">

              <div>
                <span>🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <small>On your entire order</small>
                </div>
              </div>

              <div>
                <span>↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <small>Hassle-free returns</small>
                </div>
              </div>

              <div>
                <span>🛡️</span>
                <div>
                  <strong>Secure Payment</strong>
                  <small>100% protected checkout</small>
                </div>
              </div>

            </div>

          </aside>

        </form>
      </div>
    </section>
  );
}





