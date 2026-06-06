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
let allCategories = [];

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

      ${!order.chef
      ? `
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
        `
        : ""
      }
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

async function createCategory(event) {
  event.preventDefault();

  const name = document.getElementById("categoryName").value;
  const description = document.getElementById("categoryDescription").value;

  try {
    const result = await fetchAPI("/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, description }),
    });

    console.log("Category created:", result);
    await loadCategories();
    alert("Category created successfully");
    event.target.reset();

  } catch (error) {
    console.error("Create category failed:", error);
    alert(error.message || "Failed to create category");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("categoryForm");
  form.addEventListener("submit", createCategory);

  const menuForm = document.getElementById("menuForm");
  if (menuForm) {
    menuForm.addEventListener("submit", handleSubmitMenu);
  }
});

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

function renderCategoriesForMenuPage(categories) {
  const container = document.getElementById("categoryContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!categories || !categories.length) {
    container.innerHTML = "<p>No categories.</p>";
    return;
  }

  const allBtn = document.createElement("button");
  allBtn.className = "category-btn active";
  allBtn.innerText = "All";

  allBtn.addEventListener(
    "click", 
    
    () => {
    document.querySelectorAll("#categoryContainer .category-btn").forEach(b => b.classList.remove("active"));
    allBtn.classList.add("active");
    renderMenus(allMenus); 
  });
  container.appendChild(allBtn);

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.innerText = category.name;

    btn.addEventListener(
      "click", 
      
      () => {
        document.querySelectorAll("#categoryContainer .category-btn").forEach(
          b => b.classList.remove("active")
        );
        btn.classList.add("active");

        const filteredMenus = allMenus.filter(
          menu => menu.category?.id === category.id
        );
        renderMenus(filteredMenus);
      }
    );

    container.appendChild(btn);
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

const menuForm = document.getElementById("menuForm");
if (menuForm) {
  menuForm.addEventListener(
    "submit",

    async (e) => {
      e.preventDefault();

      const editingId = document.getElementById("editingMenuId")?.value || "";
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
          delete payload.name;

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
        refreshFilteredMenus();

        } catch (error) {
        console.error(error);

        alert(
            error.message || "Failed to save menu."
        );
        }
    }
  )
}

async function handleSubmitMenu(event) {
  event.preventDefault();

  const editingMenuId = document.getElementById("editingMenuId")?.value || "";

  if (editingMenuId) {
    await updateMenu(event, editingMenuId);
  } else {
    await createMenu(event);
  }
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

function resetMenuForm() {
  const form = document.getElementById("menuForm");
  form.reset();

  document.getElementById("editingMenuId").value = "";

  document.querySelector("#menuForm button[type='submit']").innerText = "Create Menu";
  document.querySelector(".create-menu-card h2").innerText = "Create Menu";
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

    allMenus = await fetchAPI("/menu");
    refreshFilteredMenus();

  } catch (error) {
    console.error(error);

    alert(error.message || "Failed to update availability");
  }
}

function refreshFilteredMenus() {
  const activeBtn = document.querySelector("#categoryContainer .category-btn.active");
  const activeCategoryName = activeBtn ? activeBtn.innerText : "All";

  if (activeCategoryName === "All") {
    renderMenus(allMenus);
  } else {
    const activeCategory = allCategories.find(cat => cat.name === activeCategoryName);
    if (activeCategory) {
      const filteredMenus = allMenus.filter(menu => menu.category?.id === activeCategory.id);
      renderMenus(filteredMenus);
    } else {
      renderMenus(allMenus);
    }
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
    
    try {
      allCategories = await fetchAPI("/categories");
      renderCategoriesForMenuPage(allCategories);
    } catch (err) {
      console.error("Gagal memuat kategori di page menu:", err);
    }

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
loadCategories();