export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const update = await request.json();
        if (update.message && update.message.text) {
          const text = update.message.text.trim();
          const chatId = update.message.chat.id.toString();

          // Kiểm tra nếu tin nhắn bắt đầu bằng /duyet
          if (text.startsWith("/duyet")) {
            const parts = text.split(" ");
            if (parts.length >= 2) {
              const orderIdToApprove = parts[1];
              
              // Phản hồi lại trên Telegram
              await fetch(`https://api.telegram.org/bot8572193249:AAFSnoEWhC3eVrcSfGQsRS6XEds-DKFpdko/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `✅ Đã nhận lệnh duyệt cho mã đơn: ${orderIdToApprove}.\n(Lưu ý: Vì trang web chạy trên trình duyệt client localStorage, vui lòng đảm bảo bạn đã mở web hoặc dùng link tự động duyệt trước đó để đồng bộ trực tiếp).`
                })
              });
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    return new Response("OK", { status: 200 });
  },
};
