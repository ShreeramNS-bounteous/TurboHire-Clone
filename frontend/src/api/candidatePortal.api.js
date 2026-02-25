import api from "./axios";

export const getPortalByToken = async (token) => {
  const res = await api.get("/api/candidate-portal", {
    headers: { "X-Portal-Token": token },
  });
  return res.data;
};

export const updateProfileByToken = async (token, profileData) => {
  const res = await api.post("/api/candidate-portal/profile", profileData, {
    headers: { "X-Portal-Token": token },
  });
  return res.data;
};
