import axios from "axios";

const api = axios.create({
  baseURL: "https://metsenatclub.xn--h28h.uz/api/v1",
  headers: {
    accept: "application/json",
    "X-CSRFToken":
      "sRWw5JeSZPwYWvtzIFR66TUajuIrzJVqBjVpoKDaxFgsfRtRQimkP4v277amervY",
  },
  withCredentials: false,
});

export const getSponsorList = (params) =>
  api.get("/sponsor-list/", {
    params,
  });

export const getStudentList = (params) =>
  api.get("/student-list/", {
    params,
  });

export const getStudentDetails = (id) => api.get(`/student-detail/${id}`);

export const getDashboardData = () => api.get("dashboard/");
