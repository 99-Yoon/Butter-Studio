import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { User, Role } from '../db/index.js';
import Twilio from "twilio";

const login = async (req, res) => {
    try {
        const { id, password } = req.body;
        //사용자 존재 확인
        const user = await User.scope("withPassword").findOne({ where: { userId: id } });
        console.log("user : ", user);
        if (!user) {
            return res.status(422).send(`사용자가 존재하지 않습니다`);
        }
        // 2) 비밀번호 확인은 데이터베이스 프로토타입 메소드에서 처리(사용자가 입력한 비밀번호와 서버에 있는 비번 비교)
        const passwordMatch = await user.comparePassword(password);
        if (passwordMatch) {
            // 3) 비밀번호가 맞으면 토큰 생성
            const userRole = await user.getRole();
            // const userId = await user.getId();
            console.log("userRole1111 : ", userRole);
            // console.log("userId : ", userId);

            const signData = {
                id: user.id,
                nickName: user.nickname,
                role: userRole.name,
            };
            console.log("signData :  ", signData);
            const token = jwt.sign(signData, config.jwtSecret, {
                expiresIn: config.jwtExpires,
            });
            console.log(token);
            // 4) 토큰을 쿠키에 저장
            res.cookie(config.cookieName, token, {
                maxAge: config.cookieMaxAge,
                path: "/",
                httpOnly: config.env === "production",
                secure: config.env === "production",
            });
            // 5) 사용자 반환
            res.json({
                id: user.id,
                nickName: user.nickname,
                role: userRole.name,
            });
        } else {
            // 6) 비밀번호 불일치
            res.status(401).send("비밀번호가 일치하지 않습니다");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("로그인 에러");
    }

}

const logout = async (req, res) => {
    try {
        res.cookie(config.cookieName,"")
    } catch (error) {
        console.error(error);
        return res.status(500).send("로그인 에러");
    }
}

const compareId = async (req, res) => {
    const id = req.params.userId;
    const userid = await User.findOne({ where: { userId: id } });
    if (userid !== null) {
        return res.json(true);
    } else {
        return res.json(false);
    }
}

const confirmMbnum = async (req, res) => {
    const id = req.params.id;
    const token = req.params.token;

    const client = Twilio(id, token);
    // console.log(client);
    client.messages
        .create({
            to: '+8201086074580',
            from: '+14159428621',
            body: '[ButterStudio] 인증번호[1234]를 입력해주세요',
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(error));
    // console.log("id = ", id, "token = ", token);
    return res.json(true);
}

const signup = async (req, res) => {
    const { userId, userEmail, userNickName, userBirthday, userPassword } = req.body;
    // 휴대폰 중복 확인
    const userMbnum = String(req.body.userMbnum);
    try {
        const mbnum = await User.findOne({ where: { phoneNumber: userMbnum } });
        if (mbnum) {
            return res.status(422).send(`이미 있는 휴대폰번호입니다.`);
        }
        const role = await Role.findOne({ where: { name: "member" } })
        const newUser = await User.create({
            userId: userId,
            email: userEmail,
            nickname: userNickName,
            birth: userBirthday,
            phoneNumber: userMbnum,
            password: userPassword,
            roleId: role.id
        });
        res.json(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("회원가입 에러. 나중에 다시 시도 해주세요");
    }
};

const getNickName = async (req, res) => {
    console.log("여기여기");
    const id = req.params.id;
    console.log("id  :  ", id);
    try {
        const userNickName = await User.findOne({ where: { id: id }, attributes:["nickname"] });
        console.log("userNickName:    ", userNickName);
        return res.json(userNickName.nickname)
    } catch (error) {
        console.error("error :      ",error.message);
        res.status(500).send("회원가입 에러. 나중에 다시 시도 해주세요");
    }
}

export default {
    login,
    logout,
    compareId,
    confirmMbnum,
    signup,
    getNickName
}
