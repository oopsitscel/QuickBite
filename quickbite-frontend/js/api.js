const BASE_URL = "http://localhost:5000";

async function fetchAPI( endpoint, options = {} ) {
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",

      ...(options.headers || {}),
    },
  };

  // Only include body for POST, PUT, PATCH
  if(options.body){
    config.body = options.body;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message
    );
  }

  return data;
}