import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const getAll = async (selectDate) => {
  const { data } = await axios.get(`${baseUrl}/api/timetable?when=${selectDate}`)
  return data
}

const submit = async (sendData) => {
  const { data } = await axios.post(`${baseUrl}/api/timetable`, sendData)
  return data
}

const remove = async (timeId) => {
  const { data } = await axios.delete(`${baseUrl}/api/timetable/${timeId}`)
  return data
}

const timetableApi = {
  getAll,
  submit,
  remove
}

export default timetableApi