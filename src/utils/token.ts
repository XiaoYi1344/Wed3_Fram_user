export const setAccessToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

export const getAccessToken = () => localStorage.getItem("access_token");

export const clearAccessToken = () => {
  localStorage.removeItem("access_token");
};
