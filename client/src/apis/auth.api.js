import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";
import config from "../utils/clientConfig.js";

const login = async (login) => {
  const payload = login;
  const { data } = await axios.post(`${baseUrl}/api/auth/login`, payload);
  return data
};

const logout = async () => {
  alert("로그아웃되었습니다.");
  localStorage.removeItem(config.loginUser);
  await axios.get(`${baseUrl}/api/auth/logout`);
};

const signup = async (user) => {
  const url = `${baseUrl}/api/auth/signup`
  await axios.post(url, user)
}

const compareId = async (userId) => {
  const url = `${baseUrl}/api/auth/${userId}`
  const { data } = await axios.get(url)
  return data
} 

const confirmMbnum = async (id,token) => {
  const url = `${baseUrl}/api/auth/${id}/${token}`
  const { data } = await axios.get(url)
  return data
}

const getNickName = async(id) =>{
  const url = `${baseUrl}/api/auth/${id}`
  console.log("url :  ", url);
  const { nickName } = await axios.get(url)
  return nickName
}

const authApi = {
  login,
  logout,
  signup,
  compareId,
  confirmMbnum,
  getNickName,
};
export default authApi