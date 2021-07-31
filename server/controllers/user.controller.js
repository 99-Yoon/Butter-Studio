import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { User, Role } from '../db/index.js';
<<<<<<< HEAD

const getUser = async (req, res) => {
    try {
        if (req.cookies) {
            const token = req.cookies.butterStudio;
            const decoded = jwt.verify(token, config.jwtSecret);
            res.json(decoded);
        } else {
            res.json({ id: 0, role: "user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("유저를 가져오지 못했습니다.");
    }
}
=======
// import Twilio from "twilio";
>>>>>>> jiwon

const login = async (req, res) => {
    try {
        const { id, password } = req.body;
        //사용자 존재 확인
        const user = await User.scope("withPassword").findOne({ where: { userId: id } });
        if (!user) {
            return res.status(422).send(`사용자가 존재하지 않습니다`);
        }
        // 2) 비밀번호 확인은 데이터베이스 프로토타입 메소드에서 처리(사용자가 입력한 비밀번호와 서버에 있는 비번 비교)
        const passwordMatch = await user.comparePassword(password);
        if (passwordMatch) {
            // 3) 비밀번호가 맞으면 토큰 생성
            const userRole = await user.getRole();
            const signData = {
                id: user.id,
                role: userRole.name,
            };
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
        res.clearCookie(config.cookieName);
        res.json({
            id: 0,
            role: "user",
        })
        res.send('successfully cookie cleared.')
    } catch (error) {
        console.error(error);
        return res.status(500).send("로그인 에러");
    }
}

const compareId = async (req, res) => {
    try {
        const id = req.params.userId;
        const userid = await User.findOne({ where: { userId: id } });
        if (userid !== null) {
            return res.json(true);
        } else {
            return res.json(false);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("아이디 중복 확인 에러");
    }
}

const confirmMbnum = async (req, res) => {
    // const id = req.params.id;
    // const token = req.params.token;

    // const client = Twilio(id, token);
    // // console.log(client);
    // client.messages
    //     .create({
    //         to: '+8201086074580',
    //         from: '+14159428621',
    //         body: '[config.cookieName] 인증번호[1234]를 입력해주세요',
    //     })
    //     .then(message => console.log(message.sid))
    //     .catch(e => console.log(error));
    // console.log("id = ", id, "token = ", token);
    res.json(true);
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
    try {
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);
        if (decoded.role === "member") {
            const user = await User.findOne({ where: { id: decoded.id }, attributes: ["nickname"] });
            res.json(user.nickname);
        } else {
            res.status(401).send("잘못된 접근입니다.");
        }
    } catch (error) {
        console.error("error : ", error.message);
        res.status(500).send("잘못된 접근입니다.");
    }
}

const comparePw = async (req, res) => {
    try {
        //쿠키 안 토큰에서 id추출
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);
        //해당 id의 행 추출
        const user = await User.scope("withPassword").findOne({ where: { id: decoded.id } });
        //입력한 비번과 해당 행 비번을 비교
        const passwordMatch = await user.comparePassword(req.params.pw);
        //클라이언트로 동일여부를 전송
        if (passwordMatch) {
            return res.json(true)
        } else {
            return res.json(false)
        }
    } catch (error) {
        console.error("error : ", error.message);
        res.status(500).send("인증 에러");
    }
}

<<<<<<< HEAD
const modifyUser = async (req, res) => {
    try {
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);
        const { userEmail, userNickName, userMbnum, userPassword } = req.body;
        const emailOverlap = await User.findOne({ where: { email: userEmail } });
        
        if (emailOverlap) {
            return res.status(422).send(`이미 있는 이메일입니다.`);
        } else {
            if (decoded) {
                let user = await User.findOne({ where: { id: decoded.id } });
                await user.update({
                    email : userEmail,
                    nickname : userNickName,
                    phoneNumber : userMbnum,
                    password : userPassword,
                });
                res.json(user);
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("수정 에러. 나중에 다시 시도 해주세요");
    }
};
=======
const getUserInfo = async (req,res)=>{
    const {id} = req.body
    console.log(id)
    try {
        const userInfo = await User.findOne({
            where:{id:id},
            attributes:["userId","email","nickname","birth","phoneNumber"]
        })
        res.json(userInfo)
    } catch (error) {
        console.log(error)
    }
}
>>>>>>> jiwon

export default {
    getUser,
    login,
    logout,
    compareId,
    confirmMbnum,
    signup,
    getNickName,
<<<<<<< HEAD
    comparePw,
    modifyUser
=======
    getUserInfo
>>>>>>> jiwon
}
