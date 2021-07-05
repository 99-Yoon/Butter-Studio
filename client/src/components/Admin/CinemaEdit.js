const CinemaEdit = () => {
    function handleChange(e) {
        const { name, value } = e.target
        console.log("name=",name,"value=",value)
    }

    return (
        <>
            <h2 className="border-bottom border-2 text-center pb-2 me-2">현재 영화관 정보</h2>
            <input type="text" className="form-control" id="cinema" name="cinema" onChange={handleChange} />
            <p>총 상영관 수: 8개관 | 총 좌석 수: 1,282석</p>
            <div className="mb-3">
                <label for="transportation" className="form-label">대중교통 안내</label>
                <textarea className="form-control" id="transportation" name="transportation" onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
                <label for="parking" className="form-label">자가용/주차안내</label>
                <textarea className="form-control" id="parking" name="parking" onChange={handleChange}></textarea>
            </div>
            <label>지도보기</label>
        </>
    )
}
export default CinemaEdit