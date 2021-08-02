import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const submit = async (sendData) => {
  const { data } = await axios.post(`${baseUrl}/api/timetable`, sendData)
  return data
}

const timetableApi = {
  submit
}

export default timetableApi