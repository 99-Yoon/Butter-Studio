import nodemailer from "nodemailer"

const SendMail = async (req, res) => {
  const { email, title, cinema, selectedTheater, time, name, nickname } = req.body
  const selectedSeats = req.body.selectedSeats
  console.log(selectedSeats)
  const sendMail = async (email, title, cinema, selectedTheater, time, name, selectedSeats, nickname) => {
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
      html: `<div>
        <h2>
          ${name||nickname}님의 예매
        </h2>
        <div>
          영화: ${title}
        </div>
        <div>
          장소:  ${cinema}  ${selectedTheater}관
        </div>
        <div>
          일시 및 좌석: ${time} / ${selectedSeats.map(el => String.fromCharCode(parseInt(el.split('-')[0]) + 65) + el.split('-')[1]) + ' '}
        </div>
      </div>`
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

  sendMail(email, title, cinema, selectedTheater, time, name, selectedSeats, nickname);
}


export default { SendMail }