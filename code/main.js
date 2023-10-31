const nodeMailer = require('nodemailer');
const fs = require('fs');

let links = []; // Initialize an empty array to store links

const maillist = [
    'hammadirshad300@gmail.com',
    'hammadirshad23@gmail.com',
    'iqna2018@gmail.com',
  ];

// Read the contents of text.txt
fs.readFile('code/text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Split the file content into an array of lines
    const lines = data.split('\n');

    // Iterate through the lines
    lines.forEach(line => {
        if (line.includes('php') || line.includes('python') || line.includes('google') || line.includes('aws') || line.includes('azure')
        || line.includes('scrap') || line.includes('bootcamp') || line.includes('js') || line.includes('language') || line.includes('microsoft')
        || line.includes('learn') || line.includes('react') || line.includes('gcp') || line.includes('project')
        ) {
            links.push(line.trim()); // Trim to remove any extra spaces
        }
    });

    // If there are links, send an email
    if (links.length > 0) {
        sendEmail(links);
    }
});

function sendEmail(links) {
    const html = `
        
        <h2>Links:</h2>
        <ul>
            ${links.map(link => `<li>${link}</li>`).join('')}
        </ul>
    `;

    const transporter = nodeMailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "hammadirshad305@outlook.com",
            pass: "tgyfajllloxuuuim",
        },
    });

    transporter.sendMail({
        from: 'hammad irshad <hammadirshad305@outlook.com>',
        to: maillist,
        subject: 'Udemy coupon sender',
        html: html,
    }, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Message sent:", info.messageId);
        }
    });
}
