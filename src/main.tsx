import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import App from "./App";
import "antd/dist/reset.css";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root element missing");
}

createRoot(root).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: "#0b5d3b",
          colorInfo: "#0b5d3b",
          colorText: "#16181a",
          colorTextSecondary: "#62666a",
          colorBorder: "#d7d3c9",
          colorBgContainer: "#ffffff",
          borderRadius: 2,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Inter", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif',
        },
      }}
    >
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
