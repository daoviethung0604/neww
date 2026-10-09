const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = "8572193249:AAFSnoEWhC3eVrcSfGQsRS6XEds-DKFpdko";
const ADMIN_CHAT_ID = "8697704932"; // ID Telegram của riêng bạn để chống người lạ dùng lệnh

// URL kết nối Firebase của bạn (để bot có thể cập nhật số dư trực tiếp vào cơ sở dữ liệu)
const FIREBASE_REST_URL = "https://delta-client-ce1cc-default-rtdb.firebaseio.com/"; // Hoặc dùng Firestore REST API

app.post('/webhook', async (req, res) => {
    const update = req.body;
    
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id.toString();
        const text = update.message.text.trim();
        const senderId = update.message.from.id.toString();

        // Kiểm tra xem có đúng là bạn (Admin) gửi lệnh hay không
        if (senderId !== ADMIN_CHAT_ID) {
            return res.sendStatus(200);
        }

        // Cú pháp lệnh trên Telegram: /duyet <UID_hoặc_Mã_Nạp> <Số_Tiền>
        // Ví dụ: /duyet 1234 50000
        if (text.startsWith('/duyet')) {
            const parts = text.split(' ');
            if (parts.length < 3) {
                await sendTelegramMessage(chatId, "⚠️ Sai cú pháp! Sử dụng: /duyet <Mã_Nạp_Hoặc_UID> <Số_Tiền>\nVí dụ: /duyet 4821 50000");
                return res.sendStatus(200);
            }

            const targetKey = parts[1];
            const amount = parseInt(parts[2]);

            if (isNaN(amount) || amount <= 0) {
                await sendTelegramMessage(chatId, "⚠️ Số tiền không hợp lệ!");
                return res.sendStatus(200);
            }

            try {
                // Gửi thông báo thành công về Telegram
                await sendTelegramMessage(chatId, `✅ Đã duyệt thành công cộng ${amount.toLocaleString('vi-VN')}đ cho mã giao dịch/UID: <code>${targetKey}</code>`);
                
                // (Tùy chọn) Bạn có thể gọi API cập nhật Firebase trực tiếp tại đây nếu lưu số dư dạng Realtime Database hoặc Firestore.
            } catch (error) {
                await sendTelegramMessage(chatId, "❌ Lỗi hệ thống khi thực hiện lệnh duyệt.");
            }
        }
    }
    res.sendStatus(200);
});

async function sendTelegramMessage(chatId, text) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot đang chạy trên cổng ${PORT}`));
