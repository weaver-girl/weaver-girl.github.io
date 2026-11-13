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
          colorPrimary: "#b4552f",
          colorInfo: "#b4552f",
          colorLink: "#b4552f",
          colorText: "#141413",
          colorTextSecondary: "#5f5d55",
          colorBorder: "#dcd7ca",
          colorBgContainer: "#fbfaf6",
          borderRadius: 6,
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
