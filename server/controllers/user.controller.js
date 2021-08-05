import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { User, Role, ConfirmNum } from '../db/index.js';
import fs from "fs";
import CryptoJS from "crypto-js";
import validator from "validator";

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
        if (userid) {
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


// 인증번호 발송
const confirmMbnum = async (req, res) => {

    try {
        const phoneNumber = req.params.phone;

        //인증번호 생성
        const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        console.log("verifyCode : ", verifyCode);
        let today = new Date();
        let time = String(today.getTime());
        // let result = await axios({
        //     method: method,
        //     json: true,
        //     url: url,
        //     headers: {
        //         'Content-Type': "application/json",
        //         'x-ncp-apigw-timestamp': date,
        //         'x-ncp-iam-access-key': accessKey,
        //         'x-ncp-apigw-signature-v2': signature,
        //     },
        //     data: {
        //         type: 'SMS',
        //         contentType: 'COMM',
        //         countryCode: '82',
        //         from: '01086074580',
        //         content: `[본인 확인] 인증번호 [${verifyCode}]를 입력해주세요.`,
        //         messages: [
        //             {
        //                 to: `${phoneNumber}`,
        //             },
        //         ],
        //     },
        // });

        // const resultMs = result.data.messages;
        // console.log('resultMs', resultMs);

        // console.log('response', res.data, res['data']);
        const confirm = await ConfirmNum.findOne({ where: { phone: phoneNumber } });
        if (confirm) {
            await confirm.destroy();
            // 5분 유효시간 설정 
            await ConfirmNum.create({
                confirmNum: String(verifyCode),
                phone: phoneNumber,
                startTime: time,
            });
        } else {
            await ConfirmNum.create({
                confirmNum: String(verifyCode),
                phone: phoneNumber,
                startTime: time,
            }
            );
        }
        res.json({ startTime: time, isSuccess: true, code: 202, message: "본인인증 문자 발송 성공", result: res.data });
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
        const { userMbnum, number, startTime } = req.body;
        const confirm = await ConfirmNum.findOne({ where: { phone: userMbnum, startTime: startTime } });

        let today = new Date();
        let time = today.getTime();
        const elapsedMSec = time - confirm.startTime;
        const elapsedMin = String(elapsedMSec / 1000 / 60);
        if (elapsedMin <= 5) {
            if (number !== confirm.confirmNum) {
                res.send("실패");
            } else {
                await confirm.destroy();
                res.send("성공");
            }
        } else {
            res.send("재전송")
        }
    } catch (error) {
        console.error("error : ", error.message);
        res.status(500).send("잘못된 접근입니다.");
    }
};

//유효성 검사
const validation = (errorMsg, data, minLength, maxLength, dataType) => {
    if (validator.isLength(data, minLength, maxLength)) {
        errorMsg[dataType] = false;
    } else {
        errorMsg[dataType] = true;
    }
    if (dataType === "userEmail") {
        if (validator.isEmail(data, minLength, maxLength)) {
            errorMsg[dataType] = false;
        } else {
            errorMsg[dataType] = true;
        }

    }
};

const signup = async (req, res) => {
    const { userId, userName, userEmail, userNickName, userBirthday, userMbnum, userPassword } = req.body;
    try {
        let errorMsg = {
            errorId: false,
            errorName: false,
            errorEmail: false,
            errorBirthday: false,
            errorNickName: false,
            errorMbnum: false,
            errorPassword: false,
        };
        //유효성 검사
        validation(errorMsg, userId, 5, 10, "errorId");
        validation(errorMsg, userName, 1, 10, "errorName");
        validation(errorMsg, userEmail, 3, 20, "errorEmail");
        validation(errorMsg, userBirthday, 6, 6, "errorBirthday");
        validation(errorMsg, userNickName, 1, 10, "errorNickName");
        validation(errorMsg, userMbnum, 11, 11, "errorMbnum");
        validation(errorMsg, userPassword, 8, 11, "errorPassword");

        let valid = !(Object.values(errorMsg).some((element) => (element)));

        const mbnum = await User.findOne({ where: { phoneNumber: userMbnum } });
        const email = await User.findOne({ where: { email: userEmail } });
        if (!valid) {
            res.json(errorMsg);
        } else {
            if (mbnum && email) {
                return res.status(422).send(`이미 있는 이메일, 휴대폰번호입니다.`);
            } else if (!mbnum && email) {
                return res.status(422).send(`이미 있는 이메일입니다.`);
            } else if (mbnum && !email) {
                return res.status(422).send(`이미 있는 휴대폰번호입니다.`);
            } else {
                const role = await Role.findOne({ where: { name: "member" } })
                await User.create({
                    userId: userId,
                    name: userName,
                    email: userEmail,
                    nickname: userNickName,
                    birth: userBirthday,
                    phoneNumber: userMbnum,
                    password: userPassword,
                    img: "",
                    roleId: role.id
                });
                res.json("성공");
            }
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
        const token = req.cookies.butterStudio;
        const decoded = jwt.verify(token, config.jwtSecret);

        if (decoded) {
            const img = await User.findOne({ where: { id: decoded.id }, attributes: ["img"] });
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
        // 변경할 데이터가 자기자신이면 true
        if (overlap[dataType] === data) {
            return true
        } else {
            // 그렇지 않으면 다른 데이터들 중에서 중복되는지 검사
            let overlap2 = await User.findOne({ attributes: [dataType] });
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
        const { userName, userEmail, userNickName, userMbnum, userPassword } = req.body;

        let errorMsg = {
            errorName: false,
            errorEmail: false,
            errorNickName: false,
            errorMbnum: false,
            errorPassword: false,
        };

        //유효성 검사
        validation(errorMsg, userName, 1, 10, "errorName");
        validation(errorMsg, userEmail, 3, 20, "errorEmail");
        validation(errorMsg, userNickName, 1, 10, "errorNickName");
        validation(errorMsg, userMbnum, 11, 11, "errorMbnum");
        validation(errorMsg, userPassword, 8, 11, "errorPassword");

        let valid = !(Object.values(errorMsg).some((element) => (element)));
        const overlapEmail = await overlap(decoded, "email", userEmail);
        const overlapMbnum = await overlap(decoded, "phoneNumber", userMbnum);
        if (!valid) {
            res.json(errorMsg);
        } else {
            if (overlapEmail && overlapMbnum) {
                await User.update({
                    name: userName,
                    email: userEmail,
                    nickname: userNickName,
                    phoneNumber: userMbnum,
                    password: userPassword,
                }, { where: { id: decoded.id }, individualHooks: true });
                res.json("성공");
            } else if (!overlapEmail && overlapMbnum) {
                res.status(500).send("이미 있는 이메일입니다.");
            } else if (overlapEmail && !overlapMbnum) {
                res.status(500).send("이미 있는 핸드폰번호입니다.");
            } else {
                res.status(500).send("이미 있는 이메일, 핸드폰번호입니다.");
            }
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
            attributes: ["userId", "email", "nickname", "birth", "phoneNumber"]
        })
        res.json(userInfo)
    } catch (error) {
        console.log(error)
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
    getMember,
    uploadProfile,
    getUser,
    comparePw,
    modifyUser,
    getUserInfo
}
