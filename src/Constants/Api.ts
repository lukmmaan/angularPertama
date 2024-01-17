export const API_URL = "https://dtpl-be.vercel.app";

export const Headers = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
