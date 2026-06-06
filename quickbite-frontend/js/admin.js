const ordersSection = document.getElementById("ordersSection");
const usersSection = document.getElementById("usersSection");
const menusSection = document.getElementById("menusSection");
const categoriesSection = document.getElementById("categoriesSection");

const ordersNav = document.getElementById("ordersNav");
const usersNav = document.getElementById("usersNav");
const menusNav = document.getElementById("menusNav");
const categoriesNav = document.getElementById("categoriesNav");

const savedAdminName = localStorage.getItem("name") || null; 
const adminNameElement = document.getElementById("adminName");

if (adminNameElement) {
  adminNameElement.innerText = savedAdminName;
}

let allMenus = [];

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

async function renderOrders(orders) {
  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  if (!orders.length) {
    container.innerHTML =
      "<p>No orders found.</p>";
    return;
  }

  const chefs = await fetchChefs();

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <div class="order-top">
        <div>
          <strong>Order ID</strong>
          <p>${order.id}</p>
        </div>

        ${order.chef
          ? `
            <div class="assigned-chef">
              Assigned Chef:
              <strong>${order.chef.name}</strong>
            </div>
          `
          : `
            <div class="assigned-chef unassigned">
              No Chef Assigned
            </div>
          `
        }

        <div class="
          order-status
          status-${order.status.toLowerCase()}
          ">
          ${order.status}
        </div>
      </div>

      <div class="order-items">
        ${order.items.map(item => `
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

      <div class="assign-chef-row">
        <select id="chef-${order.id}" class="chef-select">
          <option value="">
            Select Chef
          </option>

          ${chefs.map(chef => `
            <option value="${chef.id}">
              ${chef.name}
            </option>
          `).join("")}
        </select>

        <button
          class="gradient-btn"
          onclick="assignChef('${order.id}')"
          >
          Assign Chef
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

async function fetchChefs() {
  const users = await fetchAPI("/users", {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token")
      }`,
    },
  });

  return users.filter(
    (user) => user.role === "CHEF"
  );
}


async function assignChef(orderId) {
  const chefId = document.getElementById(`chef-${orderId}`).value;
  if (!chefId) {
    alert("Select a chef first");
    return;
  }

  try {
    await fetchAPI(`/orders/${orderId}/assign-chef`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${
            localStorage.getItem("token")
          }`,
        },

        body: JSON.stringify({chefId}),
      }
    );

    alert("Chef assigned");
    await loadOrders();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to assign chef");
  }
}

async function loadUsers() {
  try {
    const users = await fetchAPI("/users", {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },
    });

    renderUsers(users);

  } catch (error) {
    console.error(error);
  }
}

function renderUsers(users) {
  const container = document.getElementById("usersContainer");
  container.innerHTML = "";

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <h3>${user.name}</h3>

      <p class="user-email">
        ${user.email}
      </p>

      <p class="user-role">
        ${user.role}
      </p>

      <select id="role-${user.id}" class="role-select">
        <option value="CUSTOMER" ${user.role === "CUSTOMER" ? "selected" : ""}>
          CUSTOMER
        </option>

        <option value="CHEF" ${user.role === "CHEF" ? "selected" : ""}>
          CHEF
        </option>

        <option value="ADMIN" ${user.role === "ADMIN" ? "selected" : ""}>
          ADMIN
        </option>
      </select>

      <button
        class="gradient-btn"
        onclick="updateRole('${user.id}')"
      >
        Update Role
      </button>
    `;

    container.appendChild(card);
  });
}

async function updateRole(userId) {
  const role = document.getElementById(`role-${userId}`).value;

  try {
    await fetchAPI(`/users/${userId}/role`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },

      body: JSON.stringify({role}),
    });

    alert("Role updated");
    await loadUsers();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to update role");
  }
}

async function loadCategories() {
  try {
    allCategories = await fetchAPI("/categories");

    renderCategories(allCategories);
    renderCategoryOptions();

  } catch (error) {
    console.error(error);
  }
}

function renderCategories(categories) {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = "";

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card";

    card.innerHTML = `
      <h3>${category.name}</h3>

      <p>
        ${category.description || ""}
      </p>
    `;

    container.appendChild(card);
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

async function loadMenus() {
  try {
    allMenus = await fetchAPI("/menu");

    renderMenus(allMenus);

  } catch (error) {
    console.error(error);
  }
}

function renderMenus(menus) {
  const container = document.getElementById("menusContainer");
  container.innerHTML = "";

  if (!menus.length) {
    container.innerHTML =
      "<p>No menu available.</p>";
    return;
  }

  menus.forEach((menu) => {
    const card = document.createElement("div");

    card.className = "menu-card";

    card.innerHTML = `
      ${
        menu.imageUrl
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
        <h3>${menu.name}</h3>

        <p>${menu.description}</p>

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

          <span class="
            menu-badge
            ${menu.isAvailable
              ? "available"
              : "disabled"}
          ">
            ${menu.isAvailable
              ? "Available"
              : "Disabled"}
          </span>
        </div>

        <div class="menu-actions">
          <button
            class="gradient-btn edit-btn"
            onclick="fillMenuForm('${menu.id}')"
          >
            Edit
          </button>

          <button
            class="gradient-btn availability-btn"
            onclick="toggleAvailability(
              '${menu.id}',
              ${menu.isAvailable}
            )"
          >
            ${
              menu.isAvailable
                ? "Disable"
                : "Enable"
            }
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderMenus(menus) {
  const container = document.getElementById("menusContainer");
  container.innerHTML = "";

  if (!menus.length) {
    container.innerHTML =
      "<p>No menu available.</p>";
    return;
  }

  menus.forEach((menu) => {
    const card = document.createElement("div");
    card.className = "menu-card";

    card.innerHTML = `
      ${menu.imageUrl
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
        <h3>${menu.name}</h3>

        <p>${menu.description}</p>

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

          <span class="
            menu-badge
            ${menu.isAvailable
              ? "available"
              : "disabled"}
          ">
            ${menu.isAvailable
              ? "Available"
              : "Disabled"}
          </span>
        </div>

        <div class="menu-actions">
          <button
            class="gradient-btn edit-btn"
            onclick="fillMenuForm('${menu.id}')"
          >
            Edit
          </button>

          <button
            class="gradient-btn availability-btn"
            onclick="toggleAvailability(
              '${menu.id}',
              ${menu.isAvailable}
            )"
          >
            ${
              menu.isAvailable
                ? "Disable"
                : "Enable"
            }
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function fillMenuForm(menuId) {
  const menu = allMenus.find((m) => m.id === menuId);
  if (!menu) return;

  document.getElementById("menuName").value = menu.name;
  document.getElementById("menuDescription").value = menu.description || "";
  document.getElementById("menuPrice").value = menu.price;
  document.getElementById("menuStock").value = menu.stock;
  document.getElementById("menuCookingTime").value = menu.estimatedCookingTime;
  document.getElementById("menuImage").value = menu.imageUrl || "";
  document.getElementById("menuCategory").value = menu.category?.id || "";
  document.getElementById("editingMenuId").value = menu.id;

  document.querySelector("#menuForm button[type='submit']").innerText = "Update Menu";
  document.querySelector(".create-menu-card h2").innerText = "Edit Menu";
}

async function toggleAvailability(menuId, currentAvailability) {
  try {
    await fetchAPI(`/menu/${menuId}/availability`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${
          localStorage.getItem("token")
        }`,
      },

      body: JSON.stringify({
        isAvailable: !currentAvailability,
      }),
    });

    await loadMenus();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to update availability");
  }
}

function hideAllSections() {
  ordersSection.style.display = "none";
  usersSection.style.display = "none";
  menusSection.style.display = "none";
  categoriesSection.style.display = "none";
}

function removeActiveNav() {
  document
    .querySelectorAll(".nav-links button")
    .forEach(btn => btn.classList.remove("active"));
}

ordersNav.addEventListener(
  "click",

  async () => {
    hideAllSections();
    removeActiveNav();

    ordersSection.style.display = "block";
    ordersNav.classList.add("active");

    await loadOrders();
  }
);

usersNav.addEventListener(
  "click",

  async () => {
    hideAllSections();
    removeActiveNav();

    usersSection.style.display = "block";
    usersNav.classList.add("active");

    await loadUsers();
  }
);

menusNav.addEventListener(
  "click",

  async () => {
    hideAllSections();
    removeActiveNav();

    menusSection.style.display = "block";
    menusNav.classList.add("active");

    await loadMenus();
  }
);

categoriesNav.addEventListener(
  "click",

  async () => {
    hideAllSections();
    removeActiveNav();

    categoriesSection.style.display = "block";
    categoriesNav.classList.add("active");

    await loadCategories();
  }
);

hideAllSections();
ordersSection.style.display = "block";
loadOrders();