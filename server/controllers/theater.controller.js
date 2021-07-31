import { Theater, TicketFee } from "../db/index.js";

const getTheaterInfo = async (req, res) => {
    const { theaterName } = req.body
    try {
        const theaterInfo = await Theater.findOne({
            where: { theaterName: String(theaterName) },
            attributes: ['theaterName', 'rows', 'columns']
        })
        // console.log("theaterInfo====",theaterInfo)
        return res.json(theaterInfo)
    } catch (error){
        console.log(error)
    }
}
const getAll = async (req, res) => {
    try {
        const findList = await Theater.findAll({ include: [{ model: TicketFee, attributes: ["theaterType"] }] })
        console.log("Ads==", findList)
        return res.json(findList)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

const getTypes = async (req, res) => {
    try {
        const findTypes = await TicketFee.findAll({ attributes: ['id', 'theaterType'] })
        return res.json(findTypes)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

const submit = async (req, res) => {
    try {
        const { id } = req.body
        let response = null
        if (id) response = await Theater.update({ ...req.body }, { where: { id: id } })
        else response = await Theater.create({ ...req.body })
        return res.json(response)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 저장 중 에러 발생")
    }
}

const remove = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 삭제 중 에러 발생")
    }
}

export default {
    getAll,
    getTypes,
    submit,
    remove,
    getTheaterInfo
}
