const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm?.addEventListener(
  "submit",

  async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (!email || !password) { 
      alert("All Fields are Required."); 
      return; 
    }

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
    if (!response.ok) throw new Error( data.message || "Login failed" ); 
    
    console.log(data);
    
    saveUserSession(data);
    // Open Page based on Role
    redirectByRole(data.user.role)
  }
);

registerForm?.addEventListener(
  "submit",
  
  async (e) => { 
    e.preventDefault();

    try {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value; 
      
      if (!name || !email || !password) {
        alert("Please fill all fields.");
        return; 
      } 
      
      const response = await fetch( "http://localhost:5000/auth/register", {
        method: "POST", 
        
        headers: {
          "Content-Type": "application/json",
        }, 
        
        body: JSON.stringify({
          name,
          email,
          password,
        }), 
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error( data.message || "Register failed" );
      
      console.log(data);

      saveUserSession(data);
      // Open Page based on Role
      redirectByRole(data.user.role)

    } catch (error) { 
      console.error(error);
      alert( error.message || "Register failed" ); 
    } 
  } 
);

function saveUserSession(data) {
  localStorage.setItem(
    "token",
    data.access_token
  );

  localStorage.setItem(
    "userId",
    data.user.id
  );

  localStorage.setItem(
    "role",
    data.user.role
  );
}

function redirectByRole(role) {
  if (role === "ADMIN") {
    window.location.href = "admin.html";
  }
  else if (role === "CHEF") {
    window.location.href = "chef.html";
  }
  else {
    window.location.href = "customer.html";
  }
}