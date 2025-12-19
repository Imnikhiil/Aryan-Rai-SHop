// PRODUCTS (40)
const products = [];
for(let i=1;i<=40;i++){
  products.push({
    id:i,
    name:"Product "+i,
    price:500 + i*50,
    img:`https://source.unsplash.com/400x300/?product,shopping&sig=${i}`
  });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// LOGIN
function login(){
  if(user.value==="aryan" && pass.value==="1234"){
    location.href="shop.html";
  } else alert("Invalid Login");
}

// RENDER PRODUCTS
const productBox = document.getElementById("products");
if(productBox){
  products.forEach(p=>{
    productBox.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// CART LOGIC
function addToCart(id){
  const item = products.find(p=>p.id===id);
  cart.push(item);
  saveCart();
}

function saveCart(){
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const cartBox = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cartCount");

  if(!cartBox) return;

  cartBox.innerHTML="";
  let total=0;
  cart.forEach((c,i)=>{
    total+=c.price;
    cartBox.innerHTML+=`
      <div class="cart-item">
        ${c.name} ₹${c.price}
        <button onclick="removeItem(${i})">❌</button>
      </div>`;
  });
  totalEl.textContent=total;
  countEl.textContent="Cart: "+cart.length;
}

function removeItem(i){
  cart.splice(i,1);
  saveCart();
}

// CHECKOUT
function checkout(){
  if(cart.length===0){alert("Cart empty");return;}
  orders.push({
    items:cart,
    total:cart.reduce((s,i)=>s+i.price,0),
    date:new Date().toLocaleString()
  });
  localStorage.setItem("orders",JSON.stringify(orders));
  cart=[];
  saveCart();
  alert("Payment Successful!");
}

// ORDERS PAGE
const orderBox=document.getElementById("orders");
if(orderBox){
  orders.forEach(o=>{
    orderBox.innerHTML+=`
      <div class="card">
        <h3>Order</h3>
        <p>${o.date}</p>
        <p>Total: ₹${o.total}</p>
      </div>`;
  });
}

renderCart();
