import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "react-toast-notifications";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import CadastrarUsuario from "./index";
import api from "@/services/api"; // Importe a instância da API que você está usando

// Configuração do servidor de mock
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

const server = setupServer(
  rest.post<RegisterRequestBody>("/auth/register", (req, res, ctx) => {
    const { name, email, password, role } = req.body;

    // Verifique as condições adicionais
    if (password.length < 8) {
      return res(ctx.status(400), ctx.json({ message: "A senha deve ter pelo menos 8 caracteres" }));
    }

    if (password.length > 20) {
      return res(ctx.status(400), ctx.json({ message: "A senha deve ter no máximo 20 caracteres" }));
    }

    // Realize a lógica de cadastro aqui, se necessário
    // ...

    return res(ctx.status(200));
  })
);

// Antes de executar os testes, inicie o servidor de mock
beforeAll(() => server.listen());
// Reinicie o servidor de mock após cada teste
afterEach(() => server.resetHandlers());
// Desligue o servidor de mock após os testes
afterAll(() => server.close());

describe("CadastrarUsuario", () => {
  it("should submit the form with valid data", async () => {
    const history = createMemoryHistory();
    render(
      <ToastProvider>
        <Router history={history}>
          <CadastrarUsuario />
        </Router>
      </ToastProvider>
    );

    const nameInput = screen.getByLabelText("Nome completo");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");
    const roleSelect = screen.getByLabelText("Tipo de usuário");
    const submitButton = screen.getByText("Cadastrar");

    // Preencha os campos do formulário
    userEvent.type(nameInput, "John Doe");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(passwordInput, "password123");
    userEvent.selectOptions(roleSelect, "Analista");

    // Faça o envio do formulário
    fireEvent.click(submitButton);

    // Verifique se a requisição foi feita corretamente
    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("/auth/register", {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "Analista",
      })
    );

    // Verifique se a rota foi redirecionada após o cadastro bem-sucedido
    expect(history.location.pathname).toBe("/login");

    // Verifique se a mensagem de sucesso foi exibida
    expect(screen.getByText("Cadastro realizado com sucesso")).toBeInTheDocument();
  });

  it("should display an error message when the password has less than 8 characters", async () => {
    render(
      <ToastProvider>
        <CadastrarUsuario />
      </ToastProvider>
    );

    const passwordInput = screen.getByLabelText("Senha");

    // Preencha o campo de senha com uma senha com menos de 8 caracteres
    userEvent.type(passwordInput, "pass");

    // Encontre e clique no botão de cadastrar
    const submitButton = screen.getByText("Cadastrar");
    fireEvent.click(submitButton);

    // Verifique se a mensagem de erro é exibida
    await waitFor(() =>
      expect(screen.getByText("A senha deve ter pelo menos 8 caracteres")).toBeInTheDocument()
    );
  });

  it("should display an error message when the password has more than 20 characters", async () => {
    render(
      <ToastProvider>
        <CadastrarUsuario />
      </ToastProvider>
    );

    const passwordInput = screen.getByLabelText("Senha");

    // Preencha o campo de senha com uma senha com mais de 20 caracteres
    userEvent.type(passwordInput, "averylongpasswordwithmorethan20characters");

    // Encontre e clique no botão de cadastrar
    const submitButton = screen.getByText("Cadastrar");
    fireEvent.click(submitButton);

    // Verifique se a mensagem de erro é exibida
    await waitFor(() =>
      expect(screen.getByText("A senha deve ter no máximo 20 caracteres")).toBeInTheDocument()
    );
  });
});
