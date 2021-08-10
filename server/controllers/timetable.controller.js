import { TimeTable, Theater, TheaterType, Reservation } from "../db/index.js";
import sequelize from 'sequelize'
const { Op } = sequelize

const getAll = async (req, res) => {
    try {
        const { when, movieId } = req.query
        const selectDate = new Date(when)
        let findAll = null
        const theaterArr = []
        findAll = movieId ? await TimeTable.findAll({ where: { date: selectDate, movieId: movieId }, attributes: { exclude: ['createdAt', 'updatedAt'] }, order: [["theaterId", "ASC"], ["start_time", "ASC"]], include: [Theater] })
            : await TimeTable.findAll({ where: { date: selectDate }, attributes: { exclude: ['createdAt', 'updatedAt'] }, order: [["theaterId", "ASC"], ["start_time", "ASC"]], include: [Theater] })
        findAll.forEach(async (element) => {
            if (!theaterArr.includes(element.theaterId)) theaterArr.push(element.theaterId)
            if (movieId) {
                const { count } = await Reservation.findAndCountAll({ where: { movieId: movieId, timetableId: element.id } })
                element.dataValues.reservations = count
            }
        })
        const findTheater = await Theater.findAll({ where: { id: theaterArr }, attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [TheaterType], order: [['theaterName']] })
        findTheater.forEach(el => {
            el.dataValues.theaterTypeName = el.dataValues.theatertype.dataValues.theaterTypeName
            const arr = findAll.filter(timetable => {
                if (el.id === timetable.theaterId) return timetable.dataValues
            })
            el.dataValues.timetable = arr
        })
        return res.json(findTheater)
    } catch (error) {
        return res.status(500).send(error.message || "상영시간표 정보 가져오는 중 에러 발생")
    }
}

const submit = async (req, res) => {
    try {
        const { movieId, title, theater, runtime, release_date, date } = req.body
        const result = await Promise.all(
            theater.map(async (theater) => {
                const startTime = getTime(theater.start)
                const endTime = getTime(theater.start, runtime)
                const isTimeTable = await TimeTable.findAll({
                    where: {
                        [Op.and]: [
                            { theaterId: theater.theater },
                            {
                                [Op.or]: [
                                    { [Op.and]: [{ start_time: { [Op.gt]: startTime } }, { end_time: { [Op.lte]: endTime } }] },
                                    { start_time: { [Op.between]: [startTime, endTime] } }
                                ]
                            }
                        ]
                    }
                })
                if (isTimeTable.length !== 0) return "unvalid"
                else return "valid"
            })
        )
        result.map(el => {
            if (el !== "valid") throw new Error("유효하지 않은 데이터입니다. 다시 등록해주시길 바랍니다.")
        })
        let curDate = new Date(release_date)
        const endDate = new Date(date)
        do {
            let day = curDate.getDay()
            await Promise.all(
                theater.map(async (theater) => {
                    let partTime = ""
                    if ('06:00' <= theater.start && theater.start < '10:00') partTime = "morning"
                    else if ('00:00' <= theater.start < '06:00') partTime = "night"
                    else partTime = "day"
                    await TimeTable.create({ theaterId: theater.theater, movieId, title, release_date, date: curDate, start_time: getTime(theater.start), end_time: getTime(theater.start, runtime), partTime: partTime, week: (day === 0 || day === 6) ? "weekend" : "weekdays" })
                })
            )
            curDate.setDate(curDate.getDate() + 1)
        } while (curDate <= endDate)
        res.send("success!")
    } catch (error) {
        return res.status(500).send(error.message || "상영시간표 저장 중 에러 발생")
    }
}

const getTime = (string, runtime = 0) => {
    const arr = string.split(':')
    const date = new Date(0, 0, 0, Number(arr[0]), Number(arr[1]) + runtime)
    return date
}

const remove = async (req, res) => {
    try {
        const { timeId } = req.params
        const delNum = await TimeTable.destroy({ where: { id: timeId } })
        if (delNum) res.json(delNum)
        else throw new Error("해당 정보를 서버에서 삭제하는데 실패했습니다.")
    } catch (error) {
        return res.status(500).send(error.message || "상영시간표 삭제 중 에러 발생")
    }
}

export default {
    getAll,
    submit,
    remove
}