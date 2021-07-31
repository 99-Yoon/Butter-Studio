import { Theater } from "../db/index.js";

const getTheaterInfo = async (req, res) => {
    const {theaterNum} = req.body
    try {
        const theaterInfo = await Theater.findOne({
            where: { theaterNum: theaterNum },
            attributes: ['theaterNum', 'rows', 'columns', 'theaterType']
        })
        // console.log("theaterInfo====",theaterInfo)
        return res.json(theaterInfo)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

export default {getTheaterInfo}