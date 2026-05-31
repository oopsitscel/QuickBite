const BASE_URL = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function fetchAPI( endpoint, options = {} ) {
  const response = await fetch(`${BASE_URL}${endpoint}`,
    { 
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        ...options.headers,
      },
    }
  );

  return response.json();
}