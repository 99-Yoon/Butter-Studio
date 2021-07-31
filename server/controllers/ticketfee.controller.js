import { TheaterType, TicketFee } from "../db/index.js";

const getAll = async (req, res) => {
    try {
        const findAll = await TicketFee.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [ TheaterType ] })
        return res.json(findAll)
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 가져오는 중 에러 발생")
    }
}

const getOne = async (req, res) => {
    try {
        const { theaterTypeId } = req.params
        const find = await TicketFee.findOne({ where: { theatertypeId: theaterTypeId }, attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [ TheaterType ] })
        find.dataValues.theaterTypeName = find.dataValues.theatertype.dataValues.theaterTypeName
        if (!find) throw new Error("해당 정보를 찾지 못했습니다.");
        return res.json(find)
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 가져오는 중 에러 발생")
    }
}

const edit = async (req, res) => {
    try {
        const { theatertypeId, theaterTypeName, defaultPrice, weekdays, weekend, morning, day, night, youth, adult, senior } = req.body
        let response = null
        const result = await TheaterType.findOrCreate({
            where: { id: theatertypeId },
            defaults: { theaterTypeName: theaterTypeName }
        })
        if (result[1]) {
            response = await TicketFee.create({ theatertypeId: result[0].id, defaultPrice, weekdays, weekend, morning, day, night, youth, adult, senior })
        } else {
            await TheaterType.update({ theaterTypeName: theaterTypeName }, { where: { id: theatertypeId } })
            response = await TicketFee.update({ defaultPrice, weekdays, weekend, morning, day, night, youth, adult, senior }, { where: { theatertypeId: result[0].id } })
        }
        return res.json(response)
    } catch (error) {
        return res.status(500).send(error.message || "관람료 정보 추가 및 수정 중 에러 발생")
    }
}

const remove = async (req, res) => {
    try {
        const { theaterTypeId } = req.query
        const delNum = await TicketFee.destroy({ where: { theatertypeId: theaterTypeId } })
        await TheaterType.destroy({ where: { id: theaterTypeId } })
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