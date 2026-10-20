import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "./LoginForm";

type LoginFormProps = React.ComponentProps<typeof LoginForm>;

// LoginForm calls useNavigate, which only works inside a router.
const renderLoginForm = (props: Partial<LoginFormProps> = {}) =>
  render(
    <MemoryRouter>
      <LoginForm onSubmit={vi.fn()} isLoading={false} {...props} />
    </MemoryRouter>,
  );

describe("LoginForm", () => {
  it("submits the entered email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderLoginForm({ onSubmit });

    await user.type(screen.getByLabelText(/email/i), "kutay@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret123");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await waitFor(() => expect(loginButton).toBeEnabled());
    await user.click(loginButton);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      email: "kutay@example.com",
      password: "secret123",
    });
  });

  it("shows a validation error and keeps the button disabled for an invalid email", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    // Errors appear once the user leaves the field
    await user.tab();

    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
  });

  it("shows the server error and reports when the user edits that field", async () => {
    const user = userEvent.setup();
    const onFieldChange = vi.fn();
    renderLoginForm({
      serverError: { field: "email", message: "No account found with this email" },
      onFieldChange,
    });

    expect(screen.getByText("No account found with this email")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), "a");

    expect(onFieldChange).toHaveBeenCalledWith("email");
  });
});
