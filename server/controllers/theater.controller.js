import { Theater, TheaterType } from "../db/index.js";

const getTheaterInfo = async (req, res) => {
    try {
        const { theaterId } = req.body
        const theaterInfo = await Theater.findOne({
            where: { id: theaterId },
            attributes: ['theaterName', 'rows', 'columns']
        })
        return res.json(theaterInfo)
    } catch (error) {
        console.log(error)
    }
}
const getAll = async (req, res) => {
    try {
        const findList = await Theater.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [TheaterType], order: [['theaterName']] })
        return res.json(findList)
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 가져오는 중 에러 발생")
    }
}

const getOne = async (req, res) => {
    try {
        const { theaterId } = req.params
        const find = await Theater.findOne({ where: { id: theaterId }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
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

const getTheater = async (req, res) => {
    try {
        const reservation = req.reservation;
        const theaterId = reservation.map(movie => movie.theaterId);
        const elements = await Promise.all(
            theaterId.map(async (theaterId) => {
                const theater = await Theater.findOne({ where: { id: theaterId } });
                const theaterData = {
                    theaterId: theater.id,
                    theaterName: theater.theaterName,
                    theatertypeId: theater.theatertypeId
                }
                return theaterData
            })
        );
        reservation.map(reservation => {
            const theaterId = elements.find(el => reservation.theaterId === el.theaterId);
            reservation.dataValues = {
                ...reservation.dataValues,
                theaterName: theaterId.theaterName,
                theatertypeId: theaterId.theatertypeId
            }
        })
        res.json(reservation);
    } catch (error) {
        return res.status(500).send(error.message || "상영관 정보 불러오기 실패")
    }
}

const submit = async (req, res) => {
    try {
        const { id, theatertypeId, theaterName, rows, columns } = req.body
        let response = null
        if (id) response = await Theater.update({ theatertypeId, theaterName, rows, columns }, { where: { id: id } })
        else {
            const result = await Theater.findOrCreate({
                where: { theaterName: theaterName },
                defaults: { theatertypeId, theaterName, rows, columns }
            })
            if (!result[1]) throw new Error("이미 존재하는 이름의 상영관입니다. 다시 등록해주세요.");
            else response = result[0]
        }
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
    getTheater,
    submit,
    remove,
    getTheaterInfo
}
