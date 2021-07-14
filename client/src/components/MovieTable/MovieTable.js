import styles from "./movie-table.module.scss";

const MovieTable = () => {
    return (
        <table className={`table text-center ${styles.tableForm}`}>
            <thead className={`table-dark ${styles.dNone}`}>
                <tr>
                    <th>제목</th>
                    <th>감독</th>
                    <th>상영일</th>
                    <th>줄거리</th>
                    <th>포스터</th>
                    <th>스틸컷</th>
                    <th>예고편</th>
                </tr>
            </thead>
            <tbody>
                <tr className={styles.Row} data-bs-toggle="collapse" data-bs-target={"#movie1"}>
                    <td className="d-inline-block d-md-table-cell">블랙위도우</td>
                    <td data-label="- " className={`d-inline-block d-md-table-cell ${styles.data}`}>케이트 쇼트랜드</td>
                    <td data-label="/ " className={`d-inline-block d-md-table-cell ${styles.data}`}>2021-07-07</td>
                    <td className="d-none d-md-table-cell">O</td>
                    <td className="d-none d-md-table-cell">O</td>
                    <td className="d-none d-md-table-cell">X</td>
                    <td className="d-none d-md-table-cell">X</td>
                </tr>
                <tr className={styles.Row}>
                    <td colSpan="7" className="collapse" id={"movie1"}>
                        <div className={`d-inline-block d-md-none ${styles.word} mb-2`}>
                            줄거리 - O /
                            포스터 - O /
                            스틸컷 - X /
                            예고편 - X
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-danger">삭제</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default MovieTable