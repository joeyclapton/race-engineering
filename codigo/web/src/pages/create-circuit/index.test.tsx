import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useForm } from "react-hook-form";
import { ChakraProvider } from "@chakra-ui/react";

import CircuitPage from "./index";

const server = setupServer(
  rest.post("/circuits", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should redirect to /list-circuit on successful form submission", async () => {
  const history = createMemoryHistory();
  history.push("/");

  render(
    <ChakraProvider>
      <Router history={history}>
        <CircuitPage />
      </Router>
    </ChakraProvider>
  );

  const nameInput = screen.getByPlaceholderText("Digite o nome do circuito");
  const localInput = screen.getByPlaceholderText("Digite o local do circuito");
  const trackSizeInput = screen.getByPlaceholderText(
    "Digite o tamanho do track size do circuito"
  );
  const safetyMarginInput = screen.getByPlaceholderText(
    "Digite o tamanho da margin do circuito"
  );
  const submitButton = screen.getByText("Cadastrar");

  fireEvent.change(nameInput, { target: { value: "Circuito de Teste" } });
  fireEvent.change(localInput, { target: { value: "Local de Teste" } });
  fireEvent.change(trackSizeInput, { target: { value: "1000" } });
  fireEvent.change(safetyMarginInput, { target: { value: "100" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.queryByText("Cadastro realizado com sucesso")).toBeInTheDocument();
    expect(history.location.pathname).toBe("/list-circuit");
  });
});
