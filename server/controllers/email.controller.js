import nodemailer from "nodemailer"

const SendMail = async (req,res) => {
    const {email, title, cinema,selectedTheater, time, name} = req.body
    const selectedSeats = req.body.selectedSeats
    const sendMail = async (email,title, cinema,selectedTheater, time, name, selectedSeats) => {
        // 메일을 전달해줄 객체
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            user: "angelayoon99@gmail.com",
            clientId: process.env.GMAIL_CLIENTID,
            clientSecret: process.env.GMAIL_CLIENTSECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
      
        // 메일 옵션
        const mailOptions = {
          from: `${cinema} <angelayoon99@gmail.com>`,
          to: `${email}`,
          subject: `${cinema} 예매확인내역: ${title}`,
          text: `${name}님의 예매: ${title} / ${cinema} / ${selectedTheater}관 / 일시: ${time} / ${selectedSeats} /`,
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
      
      sendMail(email,title, cinema,selectedTheater, time, name, selectedSeats);
}


export default { SendMail }