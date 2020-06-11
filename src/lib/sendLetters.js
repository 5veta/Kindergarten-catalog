import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        //accessToken: 'ya29.a0AfH6SMBOFZ0QWsStHVizV-Ujl6kCrey3kBQkHmEDHYZbT2D_fKULf9xeMtwrdDAwlkBc5L0bfl3ZHexqpuHvKU_NcdZZe3WhiBYJ7mRYe94KlkBtEo-mJ8xJCxlMJyh5zgkeyMBuuK9qma6HCL4A5voeuFMu4CjMiIA',
        //expires: 1588190857507+60000,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET
        //accessUrl: 'https://oauth2.googleapis.com/token'
    }
});

export const sendLettertoRecoverPass=async(email, link)=>{
    let result = await transporter.sendMail({
        from: `<${process.env.EMAIL}>`,
        to: `${email}`,
        subject: "Password recovery",
        text: `Follow this link if you need to recover your password on site kindergartens.pro: ${link}`,
        html: `Follow this link if you need to recover your password on site kindergartens.pro: <a href="${link}">${link}</a>`
    });
    
    console.log('result: '+result);
    return result;
};

transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});