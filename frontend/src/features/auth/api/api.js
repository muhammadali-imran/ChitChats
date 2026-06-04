import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function getErrorMessage(error) {
  if (!error) return "Unexpected error. Please try again.";
  if (error.response?.data?.error) return error.response.data.error;
  if (error.message) return error.message;
  return "Unexpected error. Please try again.";
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/auth/login/", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function register({ email, password, displayName }) {
  try {
    const response = await api.post("/auth/register/", { email, password, displayName });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function forgotPassword({ email }) {
  try {
    const response = await api.post("/auth/forgot-password/", { email });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function fetchProfile(token) {
  try {
    const response = await api.get("/profile/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function saveProfile(token, profile) {
  try {
    const response = await api.post(
      "/profile/",
      { displayName: profile.displayName, email: profile.email },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
