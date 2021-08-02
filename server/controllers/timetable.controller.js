import { TimeTable } from "../db/index.js";
import sequelize from 'sequelize'
const { Op } = sequelize

const submit = async (req, res) => {
    try {
        console.log("req.body==", req.body)
        const { theater, runtime } = req.body
        const result = theater.filter(async (theater) => {
            const startDate = getDate(theater.start)
            const endDate = getDate(theater.start, runtime)
            // const isTimeTable = await TimeTable.findAll({
            //     where: {
            //         [Op.and]: [
            //             { theater: theater.theater },
            //             {
            //                 [Op.and]: [
            //                     { start_date: { [Op.lte]: endDate } },
            //                     { end_date: { [Op.gte]: startDate } }
            //                 ]
            //             }
            //         ]
            //     }
            // })
            // [Op.or]: [{ [Op.and]: [{ start_date: { [Op.gt]: startDate } }, { start_date: { [Op.gt]: endDate } }] },
            // { [Op.and]: [{ end_date: { [Op.lt]: startDate } }, { end_date: { [Op.lt]: endDate } }] }]
            console.log("isTimeTable==", isTimeTable)
            return isTimeTable
        })
        console.log("result==", result)
    } catch (error) {
        return res.status(500).send(error.message || "상영시간표 저장 중 에러 발생")
    }
}

const getDate = (string, runtime = 0) => {
    const arr = string.split(':')
    const date = new Date(0, 0, 0, Number(arr[0]), Number(arr[1]) + runtime)
    // console.log("custom==", date.toString())
    return date
}

export default {
    submit
}