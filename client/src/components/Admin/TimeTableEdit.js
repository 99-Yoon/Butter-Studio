import TimeTableEditForm from "./TimeTableEditForm";
import TimeTable from "./TimeTable";

const TimeTableEdit = () => {

    return (
        <>
            <h2 className="border-bottom border-2 text-center pb-2 me-2">현재 상영시간표 정보</h2>
            <div className="d-flex flex-column flex-lg-row-reverse">
                <div className="col-12 col-lg-6 ms-lg-1 mb-5">
                    <TimeTable />
                </div>
                <TimeTableEditForm />
            </div>
        </>
    )
}

export default TimeTableEdit