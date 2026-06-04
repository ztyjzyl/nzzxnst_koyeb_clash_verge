const { exec } = require("child_process");
const fs = require("fs");

// V2Ray 配置
const config = {
  "inbounds": [{
    "port": process.env.PORT || 3000,
    "protocol": "vmess",
    "settings": {
      "clients": [{
        "id": "7d0c3f4b-0f97-4b91-b1f7-8a5f0a1c9e72", // ⚠️换成你自己的 UUID
        "alterId": 0
      }]
    },
    "streamSettings": {
      "network": "ws",
      "wsSettings": {
        "path": "/ray"
      }
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }]
};

fs.writeFileSync("config.json", JSON.stringify(config, null, 2));

// 下载并运行 V2Ray
exec(`
  curl -L -o v2ray.zip https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-64.zip &&
  unzip -o v2ray.zip -d v2ray &&
  chmod +x v2ray/v2ray &&
  ./v2ray/v2ray run -config=config.json
`, (err, stdout, stderr) => {
  if (err) {
    console.error("启动错误:", err);
    return;
  }
  console.log(stdout);
});
