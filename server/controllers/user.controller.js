import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { User, Role } from '../db/index.js'

const login = async(req, res) => {
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
            // const userRole = await user.getRole();
            const signData = {
                userId: user.userid,
                //   role: userRole.name,
            };
            const token = jwt.sign(signData, config.jwtSecret, {
                expiresIn: config.jwtExpires,
            });
            // 4) 토큰을 쿠키에 저장
            res.cookie(config.cookieName, token, {
                maxAge: config.cookieMaxAge,
                path: "/",
                httpOnly: config.env === "production",
                secure: config.env === "production",
            });
            // 5) 사용자 반환
            res.json({
                userId: user.id,
                role: userRole.name,
                // isMember: user.isMember,
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

const logout = async(req, res) => {
    try{
        res.cookie()
    }catch(error) {
        console.error(error);
        return res.status(500).send("로그인 에러");
    }


const compareId = async (req, res) => {
    const id = req.params.userId;
    const userid = await User.findOne({where:{userId: id}});
        if(userid !== null){
        return res.json(true);
    }else{
        return res.json(false);
    }
}

const signup = async (req, res) => {
    const { userId, userNickName, userBirthday, userPassword } = req.body;
    // 휴대폰 중복 확인
    const userMbnum = String(req.body.userMbnum);
    try {
        const mbnum  = await User.findOne({ where: { phoneNumber: userMbnum } });
        if (mbnum) {
            return res.status(422).send(`이미 있는 휴대폰번호입니다.`);
        }
        const role = await Role.findOne({ where: {name: "user"} })
        const newUser = await User.create({
            userId: userId,
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


export default {
    login,
    compareId,
    signup
}
