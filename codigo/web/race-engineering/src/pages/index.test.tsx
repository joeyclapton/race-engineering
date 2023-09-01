import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { useForm } from "react-hook-form";
import { ToastProvider, useToast } from "@chakra-ui/react";
import { createMemoryHistory } from "history";
import { Router } from "next/router";

import TeamPage from "./index";

const server = setupServer(
  rest.post("/teams", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("envia o formulário e redireciona para /list-team", async () => {
  const history = createMemoryHistory();
  const pushMock = jest.fn();

  render(
    <RouterContext.Provider
      value={{ ...history, push: pushMock } as unknown as Router}
    >
      <ToastProvider>
        <TeamPage />
      </ToastProvider>
    </RouterContext.Provider>
  );

  fireEvent.change(screen.getByPlaceholderText("Digite o nome do time"), {
    target: { value: "Meu Time" },
  });
  fireEvent.change(screen.getByPlaceholderText("Digite a categoria do time"), {
    target: { value: "Minha Categoria" },
  });

  fireEvent.click(screen.getByText("Cadastrar"));

  await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/list-team"));
});
