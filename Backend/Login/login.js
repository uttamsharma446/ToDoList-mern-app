const nodemailer = require("nodemailer");
const userModal=require("../Modal/userModal");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})
const sendMail = async (html, toEmail) => {

    var mailOption = {
        from: 'US Teams',
        to: toEmail,
        subject: 'Verification Email',

        html: html
    }

    await transporter.sendMail(mailOption, function (err, infor) {
        if (err) {
            return "error"
        }
        else {
            return "sent"
        }

    })
}
module.exports = {
    verification: (req, res) => {
        const { name, toEmail } = req.body;

        var html = `
        <h3 style="color:white;border:1px solid red;padding:10px;background-color:red;">Verify your email to finish signing up for US Team Services</h3>
        <div style="font-size:1.2rem;padding:10px">
        <p>
        Hi ${name},

        We just need to verify your email address before you can access US Team services.
        
        <br/>Verify your email address by clicking <a href="google.com">click</a> <br/>
        
        Thanks! – The US Team
        </p>
        </div>`
    
        
      

    }
}