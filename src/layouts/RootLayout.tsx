import { Outlet, ScrollRestoration } from "react-router-dom";

import { DemoNoticeModal } from "@/components/demo-notice/DemoNoticeModal";

export const RootLayout = () => (
  <>
    <Outlet />

    <DemoNoticeModal />

    <ScrollRestoration />
  </>
);
