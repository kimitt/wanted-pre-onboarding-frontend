import axios from "axios";


//axios 인스턴스 구성 기본 값
const instance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop"
});

//인터셉터 추가:localStorage
instance.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

export default instance;
