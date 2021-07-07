import styles from "./movie-table.module.scss";

const MovieTable = () => {
    return (
        <table className={`table text-center ${styles.tableForm}`}>
            <thead className={`table-dark ${styles.dNone}`}>
                <tr>
                    <th>제목</th>
                    <th>감독</th>
                    <th>줄거리</th>
                    <th>포스터</th>
                    <th>스틸컷</th>
                    <th>예고편</th>
                </tr>
            </thead>
            <tbody>
                <tr className={styles.Row} data-bs-toggle="collapse" data-bs-target={"#movie"}>
                    <td className={styles.dInLine}>블랙위도우</td>
                    <td data-label="- " className={`${styles.data} ${styles.dInLine}`}>케이트 쇼트랜드</td>
                    <td className={styles.dNone}>O</td>
                    <td className={styles.dNone}>O</td>
                    <td className={styles.dNone}>X</td>
                    <td className={styles.dNone}>X</td>
                </tr>
                <tr>
                    <div className="collapse" id={"movie"}>
                        <td className={`${styles.data} ${styles.allDNone} ${styles.dInLine}`}>줄거리 - O</td>
                        <td className={`${styles.data} ${styles.allDNone} ${styles.dInLine}`}>포스터 - O</td>
                        <td className={`${styles.data} ${styles.allDNone} ${styles.dInLine}`}>스틸컷 - X</td>
                        <td className={`${styles.data} ${styles.allDNone} ${styles.dInLine}`}>예고편 - X</td>
                        <div className="d-flex justify-content-end mt-1">
                            <button type="button" className="btn btn-primary mx-2">수정</button>
                            <button type="button" className="btn btn-danger">삭제</button>
                        </div>
                    </div>
                </tr>
            </tbody>
        </table>
    )
}

export default MovieTable