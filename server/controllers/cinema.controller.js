import { Cinema } from "../db/index.js";

const getAll = async (req, res) => {
    try {
        const info = await Cinema.findOne({
            where: { id: 1 },
            attributes: ['cinemaName', 'transportation', 'parking', 'address', 'moreFeeInfo']
        })
        return res.json(info)
    } catch (error) {
        return res.status(500).send(error.message || "영화관 정보 가져오는 중 에러 발생")
    }
}

const edit = async (req, res) => {
    try {
        let response = null
        const result = await Cinema.findOrCreate({
            where: { id: 1 },
            defaults: { ...req.body }
        })
        if (!result[1]) {
            const updateData = await Cinema.update({ ...req.body }, { where: { id: 1 } })
            response = updateData
        } else response = result[0]
        return res.json(response)
    } catch (error) {
        return res.status(500).send(error.message || "영화관 정보 수정 중 에러 발생")
    }
}

export default {
    getAll,
    edit
}