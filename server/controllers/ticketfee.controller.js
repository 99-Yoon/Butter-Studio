import { TicketFee } from "../db/index.js";

const getAll = async (req, res) => {
    try {
        const findAll = await TicketFee.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
        return res.json(findAll)
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 가져오는 중 에러 발생")
    }
}

const getOne = async (req, res) => {
    try {
        const { theaterType } = req.params
        const find = await TicketFee.findOne({ where: { theaterType: theaterType }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
        if (!find) throw new Error("해당 정보를 찾지 못했습니다.");
        return res.json(find)
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 가져오는 중 에러 발생")
    }
}

const edit = async (req, res) => {
    try {
        const { theaterType } = req.body
        let response = null
        const result = await TicketFee.findOrCreate({
            where: { theaterType: theaterType },
            defaults: { ...req.body }
        })
        if (!result[1]) {
            const updateData = await TicketFee.update({ ...req.body }, { where: { theaterType: theaterType } })
            response = updateData
        } else response = result[0]
        return res.json(response)
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 수정 중 에러 발생")
    }
}

const remove = async (req, res) => {
    try {
        const { theaterType } = req.query
        const delNum = await TicketFee.destroy({ where: { theaterType: theaterType } })
        if (delNum) res.json(delNum)
        else throw new Error("해당 정보를 서버에서 삭제하는데 실패했습니다.");
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 삭제 중 에러 발생")
    }
}

export default {
    getAll,
    getOne,
    edit,
    remove
}