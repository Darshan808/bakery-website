import { productsData } from "./productsData.js";
import { generateSignature } from "./payment.js";
const deliveryFee = 50.0;

// Rendering Products
const products = document.getElementById("products-container");
productsData.forEach((item, i) => {
  const newProduct = document.createElement("div");
  newProduct.classList.add("product-item");
  newProduct.innerHTML = `
            <img
              class="product-img"
              src="/assets/Images/${item.img}"
              alt="${item.name}"
            />
            <div class="product-info">
              <span>${item.name}</span><span></span>Rs ${item.price} ${
    item.addInfo ? item.addInfo : ""
  }
            </div>
            <div class="action-buttons ${i + 1}">
              <button class="buy-button">
                Buy Now
              </button>
              <input type="number" min="1" value="1" />
              <img src="/assets/Images/iconPlus.png" class="add-button" />
              <img src="/assets/Images/iconMinus.png" class="remove-button" />
            </div>
          `;
  products.appendChild(newProduct);
});

//Setting up modal
const buyButtons = document.getElementsByClassName("buy-button");
const addButtons = document.getElementsByClassName("add-button");
const removeButtons = document.getElementsByClassName("remove-button");
const modal = document.querySelector(".checkout-modal");
const productsWrapper = document.querySelector(".wrapper");
for (let button of buyButtons) button.addEventListener("click", buyHandler);
for (let button of addButtons) button.addEventListener("click", addItem);
for (let button of removeButtons) button.addEventListener("click", removeItem);

function addItem(e) {
  const inputField = e.target.parentElement.children[1];
  if (parseInt(inputField.value) >= 100) return;
  inputField.value = parseInt(inputField.value) + 1;
}
function removeItem(e) {
  const inputField = e.target.parentElement.children[1];
  if (parseInt(inputField.value) <= 1) return;
  inputField.value = parseInt(inputField.value) - 1;
}

function buyHandler(e) {
  const productId = parseInt(e.target.parentElement.classList[1]);
  const quantity = parseInt(e.target.parentElement.children[1].value);
  if (isNaN(quantity) || quantity <= 0) alert(`Invalid item number!`);
  else if (quantity >= 100) alert(`cannot purchase ${quantity} items`);
  else showModal(productId, quantity);
}

function showModal(productId, quantity) {
  const item = productsData[productId - 1];
  const total = item.price * quantity + deliveryFee;
  modal.innerHTML = `
          <div class="checkout-product">
          <img src="/assets/Images/${item.img}" alt="${item.name}" />
          <div class="checkout-details">
            <div class="details-row">
              <span class="details-label">Product :</span>
              <span class="details-value">${item.name}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Price :</span>
              <span class="details-value">Rs ${item.price} ${
    item.addInfo ? item.addInfo : ""
  }</span>
            </div>
            <div class="details-row">
              <span class="details-label">Quantity</span>
              <span class="details-value">${quantity}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Delivery Charge</span>
              <span class="details-value">Rs ${deliveryFee}</span>
            </div>
            <div class="details-row">
              <span class="details-label">Grand Total</span>
              <span class="details-value">Rs ${total}</span>
            </div>
          </div>
        </div>
        <div class="checkout-buttons">
         <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" target="_blank">
         <table style="display:none;">
         <tbody>
         <tr>
         <td>
          <input type="text" id="amount" name="amount" value="100" required>
          <input type="text" id="tax_amount" name="tax_amount" value ="0" required>
          <input type="text" id="total_amount" name="total_amount" value="100" required>
          <input type="text" id="transaction_uuid" name="transaction_uuid" value="11-200-111sss1" required>
          <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required>
          <input type="text" id="product_service_charge" name="product_service_charge" value="0" required>
          <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required>
          <input type="text" id="success_url" name="success_url" value="http://127.0.0.1:5500/pages/products.html" required>
          <input type="text" id="failure_url" name="failure_url" value="http://127.0.0.1:5500/pages/products.html" required>
          <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required>
          <input type="text" id="signature" name="signature" value="YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=" required>
          <input type="text" id="secret" name="secret" value="8gBm/:&EnhH.1/q" required>
          <input value="Submit" type="submit">
          </td>
          </tr>
          </tbody>
          </table>
          <button type='submit'>E-Sewa</button>
          </form>
          <button class="close-modal">Close</button>
        </div>
  `;
  modal.classList.add("show-modal");
  document.querySelector(".close-modal").addEventListener("click", closeModal);
  productsWrapper.classList.add("blur-section");
  document
    .querySelector("form")
    .addEventListener("submit", generateSignature.bind(this, total));
}

function closeModal() {
  modal.classList.remove("show-modal");
  modal.innerHTML = "";
  productsWrapper.classList.remove("blur-section");
}
