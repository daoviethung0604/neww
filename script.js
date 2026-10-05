document.addEventListener("DOMContentLoaded", function () {
  const ua = navigator.userAgent;
  let deviceName = "Unknown Device";
  let osName = "Unknown OS";

  // Nhận diện Hệ điều hành & Thiết bị
  if (/android/i.test(ua)) {
    osName = "Android";
    const match = ua.match(/Build\/([a-zA-Z0-9_\.-]+)/) || ua.match(/;\s([^;]+)\sBuild/);
    deviceName = match ? match[1].split(' ')[0] : "Android Phone";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    osName = "iOS";
    deviceName = /iPhone/i.test(ua) ? "iPhone" : "iPad";
  } else if (/Win/i.test(ua)) {
    osName = "Windows PC";
    deviceName = "Desktop";
  } else if (/Mac/i.test(ua)) {
    osName = "macOS";
    deviceName = "MacBook/Mac";
  }

  document.getElementById("user-device").innerText = deviceName;
  document.getElementById("user-os").innerText = osName;
});

function checkKey() {
  const val = document.getElementById("key-input").value.trim();
  if (val === "") {
    alert("Vui lòng dán mã Key!");
    return;
  }
  document.getElementById("key-status").innerText = "ĐÃ KÍCH HOẠT";
  document.getElementById("key-status").style.color = "#34c759";
  alert("Xác thực thành công Key: " + val);
}
document.addEventListener("DOMContentLoaded", function () {
  const ua = navigator.userAgent;
  let deviceName = "Unknown Device";
  let osName = "Unknown OS";

  if (/android/i.test(ua)) {
    osName = "Android";
    const match = ua.match(/Build\/([a-zA-Z0-9_\.-]+)/) || ua.match(/;\s([^;]+)\sBuild/);
    deviceName = match ? match[1].split(' ')[0] : "Android Phone";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    osName = "iOS";
    deviceName = /iPhone/i.test(ua) ? "iPhone" : "iPad";
  } else if (/Win/i.test(ua)) {
    osName = "Windows PC";
    deviceName = "Desktop";
  } else if (/Mac/i.test(ua)) {
    osName = "macOS";
    deviceName = "MacBook/Mac";
  }

  document.getElementById("user-device").innerText = deviceName;
  document.getElementById("user-os").innerText = osName;
});

function checkKey() {
  const val = document.getElementById("key-input").value.trim();
  if (val === "") {
    alert("Vui lòng dán mã Key!");
    return;
  }
  document.getElementById("key-status").innerText = "ĐÃ KÍCH HOẠT";
  document.getElementById("key-status").style.color = "#34c759";
  alert("Xác thực thành công Key: " + val);
}

// Chuyển sang giao diện Menu Game khi bấm READY >
function openGameMenu(appName) {
  document.getElementById("current-app-title").innerText = appName;
  document.getElementById("main-view").style.display = "none";
  document.getElementById("game-view").style.display = "block";
}

// Quay lại trang chính khi bấm nút <
function closeGameMenu() {
  document.getElementById("game-view").style.display = "none";
  document.getElementById("main-view").style.display = "block";
}

// Chọn/Bỏ chọn các ô Proxy
function toggleProxy(card) {
  card.classList.toggle("active");
}