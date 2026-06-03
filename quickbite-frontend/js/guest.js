const menuContainer = document.getElementById("menuContainer");
const categoryContainer = document.getElementById("categoryContainer");

const loginBtn = document.getElementById("loginBtn");
const bannerLoginBtn = document.getElementById("bannerLoginBtn")

const categoryTitle = document.getElementById("categoryTitle");
const categoryDescription = document.getElementById("categoryDescription");

let allMenus = [];
let allCategories = [];

async function loadMenus() {
  try {
    allMenus = await fetchAPI("/menu");

    categoryTitle.innerText = "All Menu";
    categoryDescription.innerText = "Browse all available food and drinks.";
    
    renderMenus(allMenus);

  } catch (error) {
    console.error(error);

    menuContainer.innerHTML = `
      <p>
        Failed to load menus.
      </p>
    `;
  }
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
        setActiveCategory(btn);
        const filtered = allMenus.filter((menu) =>
            menu.category.id === category.id
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
      ${menu.imageUrl
        ? `
          <img
            src="${menu.imageUrl}"
            class="menu-image"
          />
        `
        : `
          <div class="no-image">
            No Photo Available
          </div>
        `
      }

      <div class="menu-content">
        <h3>
          ${menu.name}
        </h3>

        <p>
          ${menu.description}
        </p>

        <div class="menu-info">
          <span>
            ${menu.category.name}
          </span>

          <span>
            ${menu.estimatedCookingTime} mins
          </span>
        </div>

        <div class="menu-info">
          <span>
            Stock:
            ${menu.stock}
          </span>

          <span class="price">
            Rp ${menu.price}
          </span>
        </div>
      </div>
    `;

    menuContainer.appendChild(card);
  });
}

loginBtn.addEventListener(
  "click",

  () => {
    window.location.href = "login.html";
  }
);

bannerLoginBtn.addEventListener(
  "click",

  () => {
    window.location.href = "login.html";
  }
);

loadCategories();
loadMenus();