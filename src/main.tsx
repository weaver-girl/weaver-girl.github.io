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
        // Keep antd on the same ramp as index.css: claude.com's ivory paper, near-black
        // ink and a darkened clay for interactive colour (pastel clay fails contrast).
        token: {
          colorPrimary: "#a94c29",
          colorInfo: "#a94c29",
          colorLink: "#a94c29",
          colorText: "#141413",
          colorTextSecondary: "#5e5d59",
          colorBorder: "#d1cfc5",
          colorBorderSecondary: "#e8e6dc",
          colorBgContainer: "#ffffff",
          colorBgLayout: "#faf9f5",
          colorFillSecondary: "#f5f4ed",
          borderRadius: 8,
          fontSize: 15,
          fontFamily:
            '"Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans CJK SC", "Noto Sans SC", "Microsoft YaHei", sans-serif',
        },
      }}
    >
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
