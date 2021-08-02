import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { User, Role, Guest } from '../db/index.js';
import fs from "fs";
import CryptoJS from "crypto-js";
import axios from "axios";


const getUser = async (req, res) => {
    try {
        if (req.cookies.butterStudio) {
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

// 휴대폰 인증

const NCP_serviceID = 'ncp:sms:kr:270376424445:butterstudio';
const NCP_accessKey = 'GQmVCT2ZFxnEaJOWbrQs';
const NCP_secretKey = 'XLQQ8sd9WxW40hNi0xNBTOG0T8ksRsr8c8sUIEvy';

const date = Date.now().toString();
const uri = NCP_serviceID;
const secretKey = NCP_secretKey;
const accessKey = NCP_accessKey;
const method = 'POST';
const space = " ";
const newLine = "\n";
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
const url2 = `/sms/v2/services/${uri}/messages`;

//시크릿 키를 암호화하는 작업
const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);
let inherentNum = "";
// 유효시간 5분 설정
const time = () => {
    inherentNum = false;
    return inherentNum
}
// 인증번호 발송
const confirmMbnum = async (req, res) => {

    try {
        const phoneNumber = req.params.phone;
        console.log(phoneNumber);
    
        //인증번호 생성
        const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        console.log("verifyCode : ",verifyCode);
    
        let result = await axios({
            method: method,
            json: true,
            url: url,
            headers: {
                'Content-Type': "application/json",
                'x-ncp-apigw-timestamp': date,
                'x-ncp-iam-access-key': accessKey,
                'x-ncp-apigw-signature-v2': signature,
            },
            data: {
                type: 'SMS',
                contentType: 'COMM',
                countryCode: '82',
                from: '01086074580',
                content: `[본인 확인] 인증번호 [${verifyCode}]를 입력해주세요.`,
                messages: [
                    {
                        to: `${phoneNumber}`,
                    },
                ],
            },
        });
        const resultMs = result.data.messages;
        console.log('resultMs', resultMs);

        console.log('response', res.data, res['data']);
        inherentNum = String(verifyCode);

        // 5분 유효시간 설정 
        setTimeout(time, 300000);
        res.json({ isSuccess: true, code: 202, message: "본인인증 문자 발송 성공", result: res.data });
    } catch (error) {
        console.log("error: ", error);
        if (error.res == undefined) {
            res.json({ isSuccess: true, code: 200, message: "본인인증 문자 발송 성공", result: res.data });
        }
        else res.json({ isSuccess: true, code: 204, message: "본인인증 문자 발송에 문제가 있습니다.", result: error.res });
    }
};
//  인증번호 확인
const confirmNum = async (req, res) => {
    try {
        const verifyCode = inherentNum;
        const confirmNum = req.params.num;
        if(!verifyCode){
            res.send("재전송")
        }else{
            if (confirmNum !== verifyCode) {
                res.send("실패");
            }else {
                res.send("성공");
            }
        }
    } catch (error) {
        console.error("error : ", error.message);
        res.status(500).send("잘못된 접근입니다.");
    }
};

const signup = async (req, res) => {
    const { userId, userEmail, userNickName, userBirthday, userMbnum, userPassword } = req.body;
    // 휴대폰 중복 확인
    try {
        const mbnum = await User.findOne({ where: { phoneNumber: userMbnum } });
        const email = await User.findOne({ where: { email: userEmail } });

        if (mbnum && email) {
            return res.status(422).send(`이미 있는 이메일, 휴대폰번호입니다.`);
        } else if (!mbnum && email) {
            return res.status(422).send(`이미 있는 이메일입니다.`);
        } else if (mbnum && !email) {
            return res.status(422).send(`이미 있는 휴대폰번호입니다.`);
        } else {
            const role = await Role.findOne({ where: { name: "member" } })
            const newUser = await User.create({
                userId: userId,
                email: userEmail,
                nickname: userNickName,
                birth: userBirthday,
                phoneNumber: userMbnum,
                password: userPassword,
                img:"",
                roleId: role.id
            });
            res.json(newUser);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("회원가입 에러. 나중에 다시 시도 해주세요");
    }
};

const getMember = async (req, res) => {
    try {
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);
        if (decoded.role === "member") {
            const user = await User.findOne({ where: { id: decoded.id } });
            res.json({ nickname: user.nickname, img: user.img });
        } else {
            res.status(401).send("잘못된 접근입니다.");
        }
    } catch (error) {
        console.error("error : ", error.message);
        res.status(500).send("잘못된 접근입니다.");
    }
}

const uploadProfile = async (req, res) => {
    try {
        const image = req.file.filename;
        console.log(req.file);
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);

        if (decoded) {
            const img = await User.findOne({ where: { id: decoded.id }, attributes: ["img"] });
            console.log("여기여기");
            fs.unlink("upload" + `\\${img.img}`, function (data) { console.log(data); });

            const user = await User.update({
                img: image
            }, { where: { id: decoded.id } });
            if (user) {
                const success = await User.findOne({ where: { id: decoded.id }, attributes: ["img"] });
                res.json(success)
            } else {
                throw new Error("프로필 등록 실패")
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("프로필 에러");
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
        console.log("passwordMatch : ", passwordMatch);
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

const overlap = async (decoded, dataType, data) => {
    try {
        let overlap = await User.findOne({ where: { id: decoded.id } });
        console.log("기존 데이터 : ", overlap, "변경할 데이터 :    ", data);
        if (overlap[dataType] === data) {
            console.log("여기여기")
            return true
        } else {
            let overlap2 = await User.findOne({ attributes: [dataType] });
            console.log(overlap2)
            if (overlap2[dataType] === data) {
                return false
            } else {
                return true
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

const modifyUser = async (req, res) => {
    try {
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);
        const { userEmail, userNickName, userMbnum, userPassword } = req.body;
        console.log(userEmail);
        console.log(userMbnum);

        const overlapEmail = await overlap(decoded, "email", userEmail);
        const overlapMbnum = await overlap(decoded, "phoneNumber", userMbnum);
        console.log("overlapEmail", overlapEmail, " overlapMbnum : ", overlapMbnum);

        if (overlapEmail && overlapMbnum) {
            const user = await User.update({
                email: userEmail,
                nickname: userNickName,
                phoneNumber: userMbnum,
                password: userPassword,
            }, { where: { id: decoded.id } });
            console.log("user22 :", user);
            res.json(user);
        } else if (!overlapEmail && overlapMbnum) {
            res.status(500).send("이미 있는 이메일입니다.");
        } else if (overlapEmail && !overlapMbnum) {
            res.status(500).send("이미 있는 핸드폰번호입니다.");
        } else {
            res.status(500).send("이미 있는 이메일, 핸드폰번호입니다.");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("수정 에러. 나중에 다시 시도 해주세요");
    }
};
const getUserInfo = async (req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        const userInfo = await User.findOne({
            where: { id: id },
            attributes: ["id","userId", "email", "nickname", "birth", "phoneNumber"]
        })
        console.log(userInfo)
        res.json(userInfo)
    } catch (error) {
        res.status(500).send("회원정보 불러오기 실패");
    }
}

const saveGuestInfo = async (req, res) => {
    const { name, email, birth, phoneNumber, password } = req.body
    try {
        const newGuest = await Guest.create({
            name: name,
            email: email,
            birth: birth,
            phoneNumber: phoneNumber,
            password: password,
        });
        res.json(newGuest);
    } catch (error) {
        console.log(error)

        res.status(500).send("비회원정보 등록 실패");
    }
}

export default {
    getUser,
    login,
    logout,
    compareId,
    confirmMbnum,
    confirmNum,
    signup,
    comparePw,
    modifyUser,
    saveGuestInfo,
    getMember,
    uploadProfile,
    getUserInfo
}
