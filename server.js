const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// تفعيل حزم الأمان وقراءة البيانات القادمة من استمارة الـ HTML
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. إعداد الاتصال الآمن مع بريدك الإلكتروني في Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raoufkadriii3@gmail.com', // بريدك الإلكتروني المعتمد
        pass: 'nwie sooe negt wesr' // ⚠️ ضع هنا الـ App Password المكون من 16 حرفاً (وليس كلمتك السرية العادية)
    }
});

// 2. استقبال معالجة الطلب من موقع yourweb.indz
app.post('/submit-request', (req, res) => {
    const { name, email, description, budget } = req.body;

    // صياغة شكل محتوى الرسالة التي ستصل إلى بريدك الإلكتروني
    const mailOptions = {
        from: 'yourweb.indz <raoufkadriii3@gmail.com>', // مرسل الإيميل
        to: 'raoufkadriii3@gmail.com', // البريد الذي سيستقبل الطلبات (إيميلك الشخصي)
        subject: New Request: $ { name }(yourweb.indz),
        text: وصلك طلب جديد لإنشاء موقع إلكتروني عبر موقع yourweb.indz:

            اسم الزبون: $ { name }
        بريد الزبون الإلكتروني: $ { email }
        الميزانية المقترحة: $ { budget }
        د.ج(DZD)

        تفاصيل المشروع المطلوب: $ { description },
        html:
            <
            div style = "font-family: 'Cairo', Tahoma, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);" >
            <
            div style = "background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 20px; text-align: center; color: white;" >
            <
            h2 style = "margin: 0; font-size: 20px;" > طلب مشروع جديد | yourweb.indz < /h2> < /
            div > <
            div style = "padding: 24px; background-color: #ffffff; color: #334155;" >
            <
            p style = "font-size: 16px; margin-bottom: 20px;" > لقد تلقيت طلباً جديداً لإنشاء موقع إلكتروني، إليك التفاصيل الكامله للزبون: < /p>

            <
            table style = "width: 100%; border-collapse: collapse; margin-bottom: 20px;" >
            <
            tr >
            <
            td style = "padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%;" > اسم الزبون: < /td> <
        td style = "padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;" > $ { name } < /td> < /
        tr > <
        tr >
        <
        td style = "padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;" > بريد الزبون: < /td> <
        td style = "padding: 10px; border-bottom: 1px solid #f1f5f9; color: #2563eb; direction: ltr; text-align: right;" > < a href = "mailto:${email}" > $ { email } < /a></td >
        <
        /tr> <
        tr >
        <
        td style = "padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;" > الميزانية المقترحة: < /td> <
        td style = "padding: 10px; border-bottom: 1px solid #f1f5f9; color: #10b981; font-weight: bold; font-size: 16px;" > $ { budget }
        دينار جزائري(DA) < /td> < /
        tr > <
        /table>

        <
        div style = "background-color: #f8fafc; padding: 16px; border-radius: 8px; border-right: 4px solid #2563eb;" >
        <
        strong style = "display: block; margin-bottom: 8px; color: #0f172a;" > وصف وتفاصيل المشروع المطلوب: < /strong> <
        p style = "margin: 0; line-height: 1.6; white-space: pre-wrap;" > $ { description } < /p> < /
        div > <
        /div> <
        div style = "background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;" >
        هذه الرسالة أُ رسلت تلقائياً من نظام استمارات yourweb.indz <
        /div> < /
        div >

    };

    // 3. الأمر الفعلي لإرسال الإيميل
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('حدث خطأ أثناء إرسال الإيميل للباكيند:', error);
            return res.status(500).send('<h2 style="font-family: sans-serif; text-align: center; margin-top: 50px; color: red;">عذراً، حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.</h2>');
        }
        console.log('تم إرسال طلب الزبون بنجاح إلى إيميلك: ' + info.response);

        // رسالة النجاح التي تظهر للزبون الجزائري في المتصفح بعد الضغط على الزر
        res.send( <
            div style = "font-family: sans-serif; text-align: center; margin-top: 100px; direction: rtl;" >
            <
            h2 style = "color: #10b981;" > شكرً ا لك!تم إرسال طلبك بنجاح إلى إدارة yourweb.indz. < /h2> <
            p style = "color: #64748b;" > لقد استلمنا تفاصيل مشروعك وسنقوم بالرد عليك في أقرب وقت ممكن عبر بريدك الإلكتروني. < /p> <
            a href = "javascript:history.back()"
            style = "display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;" > العودة للموقع < /a> < /
            div >
        );
    });
});

// تشغيل السيرفر المحلي على بورت 3000
app.listen(PORT, () => {
            console.log([OK] Server is running successfully on http: //localhost:${PORT});
                console.log([INFO] Ready to route all forms to raoufkadriii3 @gmail.com);
            });