import axios from "axios";
import { baseUrl } from "../utils/baseUrl.js";

const approveReq = async (info) => {
    const url = `${baseUrl}/api/kakaopay/test/single`;
    const { data } = await axios.post(url,info);
    return data
}

const approveSuccess = async (info) => {
    const url = `${baseUrl}/api/kakaopay/success`;
    const { data } = await axios.post(url,info);
    return data
}

const paymentCancel = async (info) => {
    const url = `${baseUrl}/api/kakaopay/cancel`;
    const { data } = await axios.post(url,info);
    return data
}

const kakaopayApi = {
    approveReq,
    approveSuccess,
    paymentCancel
}
export default kakaopayApi