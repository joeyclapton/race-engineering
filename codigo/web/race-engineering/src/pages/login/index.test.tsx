import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import LoginPage from "./index";

interface LoginRequest {
  email: string;
  password: string;
}

const server = setupServer(
  rest.post<LoginRequest>("/auth/login", (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === "admin@email.com" && password === "password") {
      return res(ctx.json({ token: "your-token" }));
    } else {
      return res(ctx.status(400), ctx.json({ error: "Invalid credentials" }));
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginPage", () => {
  it("deve preencher o email e a senha, fazer login e redirecionar para a rota '/'", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");
    const loginButton = screen.getByText("Fazer login");

    fireEvent.change(emailInput, { target: { value: "admin@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
});
