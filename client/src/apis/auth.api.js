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
  const { data } = await axios.get(`${baseUrl}/api/auth/logout`);
  return data
};

const guestLogin = async (guest) => {
  const { data } = await axios.post(`${baseUrl}/api/auth/guest`, guest);
  return data
}

const signup = async (user) => {
  const url = `${baseUrl}/api/auth/signup`;
  const { data } = await axios.post(url, user);
  return data
}

const confirmMbnum = async (phone) => {
  const url = `${baseUrl}/api/auth/phone/${phone}`
  const { data } = await axios.post(url);
  return data
}

const confirmNum = async (confirmNum) => {
  const url = `${baseUrl}/api/auth/num`
  const { data } = await axios.post(url, confirmNum);
  return data
}

const profile = async (formData) => {
  const url = `${baseUrl}/api/auth/profile`
  const { data } = await axios.post(url, formData)
  return data
}
const getMember = async () => {
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
  const { data } = await axios.post(url, user)
  return data
}

const authApi = {
  getUser,
  login,
  logout,
  guestLogin,
  signup,
  confirmMbnum,
  confirmNum,
  profile,
  getMember,
  comparePw,
  modifyUser
};
export default authApi