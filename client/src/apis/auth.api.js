import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const getUser = async () => {
  const url = `${baseUrl}/api/auth/user`
  const { data } = await axios.get(url)
  return data

}

const login = async (login) => {
  const payload = login;
  const { data } = await axios.post(`${baseUrl}/api/auth/login`, payload);
  return data
};

const logout = async () => {
  alert("로그아웃되었습니다.");
  const { data } = await axios.get(`${baseUrl}/api/auth/logout`);
  return data
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

const confirmMbnum = async (id, token) => {
  const url = `${baseUrl}/api/auth/${id}/${token}`
  const { data } = await axios.get(url)
  return data
}

const profile = async (formData) => {
  const url = `${baseUrl}/api/auth/profile`
  const { data } = await axios.post(url, formData)
  return data
}
const getMember = async (id) => {
  const url = `${baseUrl}/api/auth/member`
  const { data } = await axios.get(url)
  return data
}

const comparePw = async (pw) => {
  const url = `${baseUrl}/api/auth/pw/${pw}`
  const { data } = await axios.get(url)
  return data
}

const modifyUser = async (user) => {
  const url = `${baseUrl}/api/auth/modify`
  await axios.post(url, user)
}

const authApi = {
  getUser,
  login,
  logout,
  signup,
  compareId,
  confirmMbnum,
  profile,
  getMember,
  comparePw,
  modifyUser,
};
export default authApi