import styles from "./my-info.module.scss";
import { useAuth } from "../../context/auth_context";
import { useState, useEffect } from "react";
import authApi from "../../apis/auth.api";

const MyInfo = () => {
    const { user } = useAuth();
    const [userNickName, setUserNickName] = useState(user.nickname);

    const getNickName = async (id) => {
        console.log(id);
        const nickname = await authApi.getNickName(id);
        console.log(nickname);
        return nickname
    }

    useEffect(() => {
        let name = getNickName(user.id);
        setUserNickName(name);
    }, [])

    return (
        <div className="d-flex flex-column">
            <span className={styles.title}>마이페이지</span>
            <div className="d-flex flex mh-100">
                <img src="/images/cat.jpg" className="img-thumbnail rounded-circle" />
                <div>
                    <span>{`${userNickName}`}님 반갑습니다!</span>
                    <button>수정</button>
                </div>
            </div>
        </div>
    )
}

export default MyInfo