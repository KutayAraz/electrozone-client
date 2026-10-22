import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { DemoNoticeModal } from "./DemoNoticeModal";

// CustomModal closes itself on navigation, so it needs a router. StrictMode matches
// main.tsx: its double-run effects once made this modal close itself on mount.
const renderNotice = () =>
  render(
    <StrictMode>
      <MemoryRouter>
        <DemoNoticeModal />
      </MemoryRouter>
    </StrictMode>,
  );

describe("DemoNoticeModal", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows on the first visit and is remembered once dismissed", async () => {
    const user = userEvent.setup();
    renderNotice();

    expect(screen.getByRole("dialog", { name: "Demo store notice" })).toBeInTheDocument();
    // Only the visitor dismissing it may mark it as seen, not the modal mounting
    expect(localStorage.getItem("electrozone:demo-notice-seen")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Got it, start browsing" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(localStorage.getItem("electrozone:demo-notice-seen")).toBe("true");
  });

  it("stays hidden for a returning visitor", () => {
    localStorage.setItem("electrozone:demo-notice-seen", "true");
    renderNotice();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
