const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();


  

  if (!response.ok) {
     throw new Error(
      data.detail ||
      data.username?.[0] ||
      data.email?.[0] ||
      data.password?.[0] ||
      data.re_password?.[0] ||
      JSON.stringify(data) ||
      "Registration failed"
    );
  }

  return data;
}


export async function loginUser(username, password) {
  const response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Invalid username or password"
    );
  }

  return data;
}


export async function getCurrentUser(accessToken) {
  // Ensure token is a clean string (handles cases where an object might be passed)
  const tokenString = typeof accessToken === "object" ? accessToken?.access : accessToken;

  if (!tokenString || tokenString === "undefined" || tokenString === "null") {
    throw new Error("No access token available.");
  }

  const response = await fetch(`${BASE_URL}/auth/users/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenString}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Unable to get current user");
  }

  return data;
}



export async function refreshAccessToken(refreshToken) {
  const response = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Unable to refresh token"
    );
  }

  return data;
}