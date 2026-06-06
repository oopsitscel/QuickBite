const menuSection = document.getElementById("menuSection");
const menuContainer = document.getElementById("menuContainer");

const ordersSection = document.getElementById("ordersSection");
const ordersContainer = document.getElementById("ordersContainer");

const categoryContainer = document.getElementById("categoryContainer");
const categoryTitle = document.getElementById("categoryTitle");
const categoryDescription = document.getElementById("categoryDescription");

let allCategories = [];

const menuNav = document.getElementById("menuNav");
const ordersNav = document.getElementById("ordersNav");

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartWidget = document.querySelector(".cart-section");

const checkoutBtn = document.getElementById("checkoutBtn");
const logoutBtn = document.getElementById("logoutBtn");
 
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let activeCategoryId = null;
let allMenus = [];

const savedUserName = localStorage.getItem("name") || null; 
const userNameElement = document.getElementById("userName");

if (userNameElement) {
  userNameElement.innerText = savedUserName;
}

async function loadCategories() {
  try {
    allCategories = await fetchAPI("/categories");
    renderCategories();
  } catch (error) {
    console.error(error);
  }
}

function renderCategories() {
  categoryContainer.innerHTML = "";

  /* ALL BUTTON */
  const allBtn = document.createElement("button");

  allBtn.className = "category-btn active";
  allBtn.innerText = "All";

  allBtn.addEventListener(
    "click",

    () => {
      activeCategoryId = null;
      setActiveCategory(allBtn);

      categoryTitle.innerText = "All Menu";
      categoryDescription.innerText = "Browse all available food and drinks.";

      renderMenus(allMenus);
    }
  );

  categoryContainer.appendChild(allBtn);

  /* CATEGORY BUTTONS */
  allCategories.forEach((category) => {
    const btn = document.createElement("button");

    btn.className = "category-btn";
    btn.innerText = category.name;

    btn.addEventListener(
      "click",

      () => {
        activeCategoryId = category.id;
        setActiveCategory(btn);

        const filtered = allMenus.filter(
          (menu) => menu.category.id === category.id
        );

        categoryTitle.innerText = category.name;
        categoryDescription.innerText = category.description 
          || `Explore delicious ${category.name} menus.`;

        renderMenus(filtered);
      }
    );

    categoryContainer.appendChild(btn);
  });
}

function setActiveCategory(activeBtn) {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  activeBtn.classList.add("active");
}

async function loadMenus() {
  try {
    allMenus = await fetchAPI("/menu");

    if (activeCategoryId) {
      const activeCategory = allCategories.find(
        (category) => category.id === activeCategoryId
      );

      const filtered = allMenus.filter(
        (menu) => menu.category.id === activeCategoryId
      );

      categoryTitle.innerText = activeCategory.name;

      categoryDescription.innerText = activeCategory.description
        || `Explore delicious ${activeCategory.name} menus.`;

      renderMenus(filtered);

    } else {
      categoryTitle.innerText = "All Menu";
      categoryDescription.innerText = "Browse all available food and drinks.";

      renderMenus(allMenus);
    }

  } catch (error) {
    console.error("Failed to load menus:", error);

    menuContainer.innerHTML = `
      <p>
        Failed to load menus. Please try again later
      </p>
    `;
  }
}

function renderMenus(menus) {
  menuContainer.innerHTML = "";

  const availableMenus = menus.filter(
    menu => menu.isAvailable === true
  );

  if (!availableMenus.length) {
    menuContainer.innerHTML = `
      <p>
        No menu available.
      </p>
    `;
    return;
  }

  availableMenus.forEach((menu) => {
    const card = document.createElement("div");
    card.className = "menu-card";

    card.innerHTML = `
      ${ menu.imageUrl
        ? `
          <img
            class="menu-image"
            src="${menu.imageUrl}"
          />
          `
        : `
          <div class="no-image">
            No Photo Available
          </div>
        `
      }

      <div class="menu-content">
        <h3> ${menu.name} </h3>
        <p> ${menu.description} </p>
        <div class="menu-info">
          <span>
            Stock: ${menu.stock}
          </span>

          <span>
            ${menu.estimatedCookingTime} mins
          </span>
        </div>

        <div class="menu-info">
          <span class="price">
            Rp ${menu.price.toLocaleString("id-ID")}
          </span>
        </div>

        <button class="gradient-btn add-btn">
            Add To Cart
        </button>
      </div>
    `;

    const addButton = card.querySelector(".add-btn");
    addButton.addEventListener(
      "click",
      () => {
        addToCart(menu.id);
      }
    );

    menuContainer.appendChild(card);
  });
}

function addToCart(menuId) {
  const menu = allMenus.find(item => item.id === menuId);
  if(!menu) return;

  const existing = cart.find(item => item.id === menuId);
  
  if (existing) {
    if (existing.quantity >= menu.stock) { 
      alert("Not enough stock available.");
      return;
    }
    existing.quantity += 1;
  } else {
    if (menu.stock <= 0) {
      alert("This item is out of stock.");
      return;
    }
    cart.push({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      stock: menu.stock,
      quantity: 1,
    });
  }

  saveCart();
  renderCart();
}

function increaseQuantity(menuId) {
  const item = cart.find(item => item.id === menuId);
  if (!item) return;

  if (item.quantity >= item.stock) {
    alert("Not enough stock available.");
    return;
  }
  item.quantity += 1;

  saveCart();
  renderCart();
}

function decreaseQuantity(menuId) {
  const item = cart.find(item => item.id === menuId);
  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== menuId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(menuId) {
  cart = cart.filter(item => item.id !== menuId);

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p class="empty-cart">
        Cart is empty
      </p>
    `;

    cartTotal.innerText = "Rp 0";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-left">
        <div class="cart-name">
          ${item.name}
        </div>

        <div class="cart-price">
          Rp ${item.price.toLocaleString("id-ID")}
        </div>
      </div>

      <div class="cart-right">
        <div class="quantity-box">
          <button class="qty-btn minus-btn">
            −
          </button>

          <span class="qty-number">
            ${item.quantity}
          </span>

          <button class="qty-btn plus-btn">
            +
          </button>
        </div>

        <button class="remove-btn">
          Remove
        </button>
      </div>
    `;

    // MINUS
    cartItem
      .querySelector(".minus-btn")
      .addEventListener(
        "click",

        () => {
          decreaseQuantity(item.id);
        }
      );

    // PLUS
    cartItem
      .querySelector(".plus-btn")
      .addEventListener(
        "click",

        () => {
          increaseQuantity(item.id);
        }
      );

    // REMOVE
    cartItem
      .querySelector(".remove-btn")
      .addEventListener(
        "click",

        () => {
          removeFromCart(item.id);
        }
      );

    cartItemsContainer.appendChild(cartItem);
  });
  cartTotal.innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

async function loadMyOrders() {
  try {
    const orders = await fetchAPI("/orders", {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },
    });
    
    const userId = localStorage.getItem("userId");

    const myOrders = orders.filter(order => order.customer.id === userId);

    renderOrders(myOrders);
  } catch (error) {
    console.error(error);
  }
  
}

function renderOrders(orders) {
  ordersContainer.innerHTML = "";

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <p>
        No orders yet
      </p>
    
    `;

    return;
  }

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <div class="order-top">
        <div>
          <strong>
            Order ID
          </strong>

          <p>
            ${order.id}
          </p>
        </div>

        <div class="
          order-status
          status-${order.status.toLowerCase()}
        ">
          ${order.status}
        </div>
      </div>

      <div class="order-items">
        ${order.items.map((item) => `
          <div class="order-item">
            <span>
              ${item.name} x ${item.quantity}
            </span>

            <span>
              Rp ${item.subtotal}
            </span>

            </div>
          `
        ).join("")}
      </div>

      <div class="order-total">
        Total:
        Rp ${order.totalPrice}
      </div>
    `;

    ordersContainer.appendChild(card);
  });
}

menuNav.addEventListener(
  "click",

  () => {
    menuSection.style.display = "block";
    ordersSection.style.display = "none";
    menuNav.classList.add("active");
    ordersNav.classList.remove("active");

    if(cartWidget){
      cartWidget.style.display = "block";
    }
  }
);

ordersNav.addEventListener(
  "click",

  async () => {
    menuSection.style.display = "none";
    ordersSection.style.display = "block";
    menuNav.classList.remove("active");
    ordersNav.classList.add("active");
    
    if(cartWidget){
      cartWidget.style.display = "none";
    }
    await loadMyOrders();
  }
);

checkoutBtn.addEventListener(
  "click",

  async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const payload = {
        customerId: localStorage.getItem("userId"),

        items: cart.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
        })),
      };

      console.log(payload);

      const response = await fetchAPI("/orders",
        {
          method: "POST",

          headers: {
            Authorization:`Bearer ${
              localStorage.getItem("token")
            }`,
          },

          body: JSON.stringify(payload),
        }
      );

      console.log(response);
      alert("Checkout successful! Your order is being processed.");

      cart = [];
      saveCart();
      renderCart();
      await loadMenus();
    } catch (error) {
      console.error(error);
      alert(error.message || "Checkout failed. Please try again.");
    }
  }
);

ordersSection.style.display = "none";

loadCategories();
loadMenus();
renderCart();