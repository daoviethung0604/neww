document.addEventListener("DOMContentLoaded", function () {
  checkDeviceSupport();
});

let isSupportedDevice = false;

function checkDeviceSupport() {
  const ua = navigator.userAgent;
  let deviceName = "Thiết bị không rõ";
  let osName = "Không xác định";
  let osVersion = 0;
  isSupportedDevice = false;

  // Kiểm tra iPhone
  const isiPhone = /iPhone/i.test(ua);

  if (isiPhone) {
    deviceName = "iPhone";
    
    // Lấy phiên bản iOS
    const match = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match && match[1]) {
      osVersion = parseInt(match[1], 10);
      osName = "iOS " + osVersion + "." + (match[2] || "0");
    } else {
      osName = "iOS";
    }

    // Kiểm tra iOS >= 16
    if (osVersion >= 16) {
      isSupportedDevice = true;
    }
  } else if (/iPad/i.test(ua)) {
    deviceName = "iPad";
    osName = "iPadOS";
  } else if (/Android/i.test(ua)) {
    deviceName = "Android Phone";
    osName = "Android";
  } else if (/Win/i.test(ua)) {
    deviceName = "Desktop";
    osName = "Windows PC";
  } else if (/Mac/i.test(ua)) {
    deviceName = "MacBook/Mac";
    osName = "macOS";
  }

  // Cập nhật giao diện thông tin
  document.getElementById("user-device").innerText = deviceName;
  document.getElementById("user-os").innerText = osName;

  const supportEl = document.getElementById("user-support");
  if (isSupportedDevice) {
    supportEl.innerHTML = "• Có Hỗ Trợ";
    supportEl.className = "active";
  } else {
    supportEl.innerHTML = "• Không Hỗ Trợ";
    supportEl.className = "inactive";
  }
}

function checkKey() {
  if (!isSupportedDevice) {
    alert("❌ Thiết bị của bạn không được hỗ trợ! Chỉ dành riêng cho iPhone chạy iOS 16.0 trở lên.");
    return;
  }

  const val = document.getElementById("key-input").value.trim();
  if (val === "") {
    alert("Vui lòng dán mã Key!");
    return;
  }
  document.getElementById("key-status").innerText = "ĐÃ KÍCH HOẠT";
  document.getElementById("key-status").style.color = "#34c759";
  alert("Xác thực thành công Key: " + val);
}

// Chuyển sang giao diện Menu Game (Chỉ mở nếu thiết bị hợp lệ)
function openGameMenu(appName) {
  if (!isSupportedDevice) {
    alert("⛔ RẤT TIẾC!\n\nHệ thống DVH HUB chỉ hỗ trợ thiết bị iPhone chạy iOS 16.0 trở lên.\n\nVui lòng sử dụng iPhone tương thích để truy cập tính năng này.");
    return;
  }

  document.getElementById("current-app-title").innerText = appName;
  document.getElementById("main-view").style.display = "none";
  document.getElementById("game-view").style.display = "block";
}

// Quay lại trang chính
function closeGameMenu() {
  document.getElementById("game-view").style.display = "none";
  document.getElementById("main-view").style.display = "block";
}

// Bật/tắt các ô Proxy
function toggleProxy(card) {
  card.classList.toggle("active");
}

// Xử lý khi nhấn nút ▶ MỞ GAME
function launchGame() {
  const currentApp = document.getElementById("current-app-title").innerText;
  const activeProxies = [];
  
  document.querySelectorAll('.proxy-card.active .p-title').forEach(el => {
    activeProxies.push(el.innerText);
  });

  if (activeProxies.length === 0) {
    alert("⚠️ Vui lòng chọn ít nhất 1 Proxy trước khi mở game!");
    return;
  }

  const isMax = currentApp.includes("Max");
  const appNameText = isMax ? "Free Fire Max" : "Free Fire";
  const iosScheme = isMax ? "freefiremax://" : "freefire://";
  const androidPkg = isMax ? "com.dts.freefiremax" : "com.dts.freefireth";

  alert("🚀 Đã kích hoạt " + activeProxies.length + " Proxy cho " + appNameText + "!\n\nHệ thống đang mở game...");

  // Thử mở ứng dụng trên iOS / Android
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = iosScheme;
  } else if (/Android/i.test(navigator.userAgent)) {
    window.location.href = "intent://#Intent;scheme=android-app;package=" + androidPkg + ";end";
  } else {
    window.location.href = iosScheme;
  }
}