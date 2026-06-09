export const login = async (data) => {
  const user = {
    id: 1,
    name: data?.email || "Admin",
    email: data?.email || "admin@local.test",
    role: "admin",
  };

  const result = {
    access_token: "dummy-local-token",
    user,
  };

  localStorage.setItem("token", result.access_token);
  localStorage.setItem("user", JSON.stringify(result.user));

  return result;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
