import nodemailer from "nodemailer"

const SendMail = async (req,res) => {
    // console.log(req.body)
    const {email} = req.body
    console.log(email)
    const sendMail = async (email) => {
        // 메일을 전달해줄 객체
        const transporter = nodemailer.createTransport({
        //   service: "gmail",
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            user: "angelayoon99@gmail.com",
            clientId: process.env.GMAIL_CLIENTID,
            clientSecret: process.env.GMAIL_CLIENTSECRET,
            accessToken: process.env.GMAIL_ACCESS_TOKEN,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
      
        // 메일 옵션
        const mailOptions = {
          from: `윤지원 <angelayoon99@gmail.com>`,
          to: "jiwon5393@naver.com",
          subject: "사용자 계정 확인용 메일.",
          text: "Test Mail from Test Server.",
        };
      
        // 메일 전송
        try {
          const mailResult = await transporter.sendMail(mailOptions);
          console.log(`Mail sent - ID : ${mailResult.messageId}`);
        } catch (err) {
          console.log("Mail Sending Failuer.");
          console.log(err);
        }
      }
      
      sendMail(email);
}


export default { SendMail }