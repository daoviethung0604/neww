function generateSensi() {
    const sensi = {
        'Nhìn quanh': Math.floor(Math.random() * 20) + 80,
        'Red Dot': Math.floor(Math.random() * 20) + 75,
        'Ống ngắm 2x': Math.floor(Math.random() * 20) + 70,
        'Ống ngắm 4x': Math.floor(Math.random() * 20) + 65,
        'Ống ngắm AWM': Math.floor(Math.random() * 20) + 50
    };

    let output = ">>> CẤU HÌNH GỢI Ý:\n";
    for (let key in sensi) {
        output += `${key}: ${sensi[key]}\n`;
    }

    document.getElementById('sensiOutput').innerText = output;
}