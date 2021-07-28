import axios from 'axios'
import config from "../config/app.config.js";

const success = (req, res) => {
    return res.json({
        message: 'Success'
    })
}

const fail = (req, res) => {
    return res.json({
        message: 'Failed'
    })
}

const cancel = (req, res) => {
    return res.json({
        message: 'Canceled'
    })
}

const singleTest = async (req, res) => {
    try {
        const item = req.body
        const data = []
        for (let property in item) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(item[property]);
            data.push(encodedKey + "=" + encodedValue);
        }
        const bodyData = data.join('&')
        const response = await axios.post('https://kapi.kakao.com/v1/payment/ready', bodyData, {
            headers: {
                'Authorization': `KakaoAK ${config.kakaoAdminKey}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        const resp = response.data
        console.log('resp', resp)
        res.json({ redirect_url: resp.next_redirect_pc_url })
    } catch (error) {
        console.log(error)
    }

}

export default { success, fail, cancel, singleTest }