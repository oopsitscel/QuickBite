const menuContainer = document.getElementById("menuContainer");

async function loadMenus() {
  const menus = await fetchAPI("/menu");
  console.log(menus);

  menuContainer.innerHTML = "";
  menus.forEach((menu) => {
    menuContainer.innerHTML += `
    
      <div class="menu-card">
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
              Stock: 
              ${menu.stock}
            </span>

            <span>
              ${menu.estimatedCookingTime}
              mins
            </span>

          </div>

          <div class="menu-info">
            <span>
              ${menu.category.name}
            </span>
            <span class="price">
              Rp ${menu.price}
            </span>

          </div>
          <button class="gradient-btn">
            Add To Cart
          </button>
        </div>
      </div>

    `;
  });
}

loadMenus();

document
  .getElementById("logoutBtn")
  .addEventListener(
    "click",

    () => {
      localStorage.clear();
      window.location.href = "login.html";
    }
  );