import { render, screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import CreateRace from "./index";

// Configurar o servidor MSW
const server = setupServer(
  rest.post("/races", (req, res, ctx) => {
    // Simular a resposta de sucesso da API
    return res(
      ctx.status(200),
      ctx.json({ message: "Cadastro realizado com sucesso" })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("testa o cadastro de corrida", async () => {
  // Configurar o histórico de navegação simulado
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <CreateRace />
    </Router>
  );

  // Encontrar os elementos do formulário
  const nomeInput = screen.getByLabelText("Nome da corrida");
  const totalVoltasInput = screen.getByLabelText("Total de voltas");
  const cadastrarButton = screen.getByText("Cadastrar");

  // Preencher os campos do formulário
  fireEvent.change(nomeInput, { target: { value: "Minha Corrida" } });
  fireEvent.change(totalVoltasInput, { target: { value: "10" } });

  // Clicar no botão "Cadastrar"
  fireEvent.click(cadastrarButton);

  // Verificar se a API foi chamada corretamente
  expect(await screen.findByText("Cadastro realizado com sucesso")).toBeInTheDocument();

  // Verificar se o caminho foi alterado para "/list-race"
  expect(history.location.pathname).toBe("/list-race");
});
