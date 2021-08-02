import TimeTableEditForm from "./TimeTableEditForm";
import TimeTable from "./TimeTable";

const TimeTableEdit = () => {
    return (
        <>
            <h2 className="border-bottom border-2 text-center pb-2 me-2">현재 상영시간표 정보</h2>
            <div className="d-flex">
                <TimeTableEditForm />
                <TimeTable />
            </div>
        </>
    )
}

export default TimeTableEdit