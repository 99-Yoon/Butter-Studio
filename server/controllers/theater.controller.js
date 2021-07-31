import { Theater, TheaterType } from "../db/index.js";

const getAll = async (req, res) => {
    try {
        const findList = await Theater.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [ TheaterType ], order: [['theaterName']] })
        return res.json(findList)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

const getOne = async (req, res) => {
    try {
        const { theaterId } = req.params
        const find = await Theater.findOne({ where: { id: theaterId } , attributes: { exclude: ['createdAt', 'updatedAt'] } })
        if (!find) throw new Error("해당 정보를 찾지 못했습니다.");
        return res.json(find)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

const getTypes = async (req, res) => {
    try {
        const findTypes = await TheaterType.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
        return res.json(findTypes)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

const submit = async (req, res) => {
    try {
        const { id, theatertypeId, theaterName, rows, columns } = req.body
        let response = null
        if (id) response = await Theater.update({ theatertypeId, theaterName, rows, columns }, { where: { id: id } })
        else response = await Theater.create({ theatertypeId, theaterName, rows, columns })
        return res.json(response)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 저장 중 에러 발생")
    }
}

const remove = async (req, res) => {
    try {
        const { theaterId } = req.params
        const delNum = await Theater.destroy({ where: { id: theaterId } })
        if (delNum) res.json(delNum)
        else throw new Error("해당 정보를 서버에서 삭제하는데 실패했습니다.");
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 삭제 중 에러 발생")
    }
}

export default {
    getAll,
    getOne,
    getTypes,
    submit,
    remove
}