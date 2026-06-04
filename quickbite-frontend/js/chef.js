const menuSection = document.getElementById("menuSection");
const ordersSection = document.getElementById("ordersSection");

const menuNav = document.getElementById("menuNav");
const ordersNav = document.getElementById("ordersNav");
const logoutBtn = document.getElementById("logoutBtn");

const menuContainer = document.getElementById("menuContainer");
const ordersContainer = document.getElementById("ordersContainer");

const menuForm = document.getElementById("menuForm");

const categoryContainer = document.getElementById("categoryContainer");
const categoryTitle = document.getElementById("categoryTitle");
const categoryDescription = document.getElementById("categoryDescription");

let allCategories = [];
let allMenus = [];
let activeCategoryId = null;

async function loadCategories() {
  try {
    allCategories = await fetchAPI("/categories");
    renderCategories();
    renderCategoryOptions();
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

function renderCategoryOptions() {
  const select = document.getElementById("menuCategory");

  select.innerHTML = `
    <option value="">
      Select Category
    </option>
  `;

  allCategories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category.id;
    option.innerText = category.name;

    select.appendChild(option);
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

  if (menus.length === 0) {
    menuContainer.innerHTML = `
      <p>
        No menu available.
      </p>
    `;
    return;
  }

  menus.forEach((menu) => {
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

        <button class="gradient-btn edit-btn">
            Edit Menu
        </button>
      </div>
    `;

    const editButton = card.querySelector(".edit-btn");
    editButton.addEventListener(
      "click",
      () => {
        fillEditForm(menu);
      }
    );

    menuContainer.appendChild(card);
  });
}

function fillEditForm(menu) {
  document.getElementById("menuName").value = menu.name;
  document.getElementById("menuDescription").value = menu.description;
  document.getElementById("menuPrice").value =  menu.price;
  document.getElementById("menuStock").value = menu.stock;
  document.getElementById("menuCookingTime").value = menu.estimatedCookingTime;
  document.getElementById("menuImage").value = menu.imageUrl || "";
  document.getElementById("menuCategory").value = menu.category.id;
  document.getElementById("editingMenuId").value =  menu.id;

  document.querySelector("#menuForm button[type='submit']").innerText = "Update Menu";
  document.querySelector(".create-menu-card h2").innerText = "Edit Menu";
}

async function editMenu(menuId) {
  const newStock = prompt("Enter new stock:");
  if (newStock === null) return;

  try {
    await fetchAPI(`/menu/${menuId}`,{
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },
      
      body: JSON.stringify({
        stock: Number(newStock),
      }),
    });

    alert("Menu updated.");
    await loadMenus();
  } catch (error) {
    console.error(error);

    alert(
      error.message || "Failed to update menu."
    );
  }
}

async function loadOrders() {
  try {
    const orders = await fetchAPI("/orders", {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },
    });
    renderOrders(orders);

  } catch (error) {
    console.error(error);
  }
}

function renderOrders(orders) {
  ordersContainer.innerHTML = "";

  if (orders.length === 0) {
    ordersContainer.innerHTML = `
      <p>No assigned orders.</p>
    `;
    return;
  }

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <div class="order-top">
        <div>
          <strong>Order ID</strong>
          <p>${order.id}</p>
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
        `).join("")}
      </div>

      <div class="order-total">
        Total: Rp ${order.totalPrice}
      </div>

      <div class="order-actions">
      
      </div>
        ${order.status === "PENDING"
          ? `
            <button
            class="action-btn cooking-btn"
            onclick="startCooking('${order.id}')"
            >
            Start Cooking
            </button>

            <button
            class="action-btn cancel-btn"
            onclick="cancelOrder('${order.id}')"
            >
            Cancel
            </button>
        `
        : ""
        }

        ${order.status === "COOKING"
        ? `
            <button
            class="action-btn ready-btn"
            onclick="markReady('${order.id}')"
            >
            Mark Ready
            </button>
        `
        : ""
        }

        ${order.status === "READY"
        ? `
            <button
            class="action-btn completed-btn"
            onclick="completeOrder('${order.id}')"
            >
            Complete
            </button>
        `
        : ""
        }
      </div>
    `;

    ordersContainer.appendChild(card);
  });
}

async function startCooking(orderId) {
  try {
    await fetchAPI(`/orders/${orderId}/status`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },

      body: JSON.stringify({
        status: "COOKING",
      }),
    });

    await loadOrders();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to start cooking.");
  }
}

async function cancelOrder(orderId) {
  try {
    await fetchAPI(`/orders/${orderId}/status`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },

      body: JSON.stringify({
        status: "CANCELLED",
      }),
    });
    alert("Order cancelled.");
    await loadOrders();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to cancel order.");
  }
}

async function markReady(orderId) {
  try {
    await fetchAPI(`/orders/${orderId}/status`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },

      body: JSON.stringify({
        status: "READY",
      }),
    });

    await loadOrders();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to mark order ready.");
  }
}

async function completeOrder(orderId) {
  try {
    await fetchAPI(`/orders/${orderId}/status`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },

      body: JSON.stringify({
        status: "COMPLETED",
      }),
    });

    await loadOrders();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to complete order.");
  }
}

menuForm.addEventListener(
  "submit",

  async (e) => {
    e.preventDefault();

    const editingId = document.getElementById("editingMenuId").value;
    const payload = {
      name: document.getElementById("menuName").value,
      description: document.getElementById("menuDescription").value,
      price: Number(document.getElementById("menuPrice").value),
      stock: Number(document.getElementById("menuStock").value),
      estimatedCookingTime: Number(document.getElementById("menuCookingTime").value),
      imageUrl: document.getElementById("menuImage").value,
      categoryId: document.getElementById("menuCategory").value,
    };

    try {
      /* EDIT MENU */
      if (editingId) {
        await fetchAPI(`/menu/${editingId}`, {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              localStorage.getItem("token")
            }`,
          },

          body: JSON.stringify(payload),
        });

        alert("Menu updated!");
      } 
      
      /* CREATE MENU */
      else {
        await fetchAPI("/menu", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              localStorage.getItem("token")
            }`,
          },

          body: JSON.stringify(payload),
        });

        alert("Menu created!");
      }

      menuForm.reset();

      document.getElementById("editingMenuId").value = "";
      document.querySelector("#menuForm button[type='submit']").innerText = "Create Menu";
      loadMenus();

    } catch (error) {
      console.error(error);

      alert(
        error.message || "Failed to save menu."
      );
    }
  }
);

menuNav.addEventListener(
  "click",

  () => {
    menuSection.style.display = "flex";
    ordersSection.style.display = "none";

    menuNav.classList.add("active");
    ordersNav.classList.remove("active");
  }
);

ordersNav.addEventListener(
  "click",

  async () => {
    menuSection.style.display = "none";
    ordersSection.style.display = "block";

    menuNav.classList.remove("active");
    ordersNav.classList.add("active");

    await loadOrders();
  }
);

ordersSection.style.display = "none";

loadCategories();
loadMenus();