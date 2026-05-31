const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener(
  "submit",

  async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    localStorage.setItem(
      "token",
      data.access_token
    );

    localStorage.setItem(
      "role",
      data.user.role
    );

    // Open Page based on Role
    if (data.user.role === "ADMIN") {
      window.location.href = "admin.html";
    }
    else if (data.user.role === "CHEF") {
      window.location.href = "chef.html";
    }
    else {
      window.location.href = "customer.html";
    }
  }
);