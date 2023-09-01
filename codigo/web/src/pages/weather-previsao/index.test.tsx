import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Previsao from "./index";

const server = setupServer(
  rest.get("https://api.openweathermap.org/data/2.5/forecast", (req, res, ctx) => {
    const params = req.url.searchParams;
    const q = params.get("q");
    if (q === "Belo Horizonte") {
      return res(
        ctx.json({
          // Aqui você pode definir o corpo da resposta esperada para a busca de Belo Horizonte
          // Simule os dados que você espera receber da API
        })
      );
    } else {
      // Caso a busca não seja por Belo Horizonte, retorne um status de erro
      return res(
        ctx.status(404),
        ctx.json({ message: "Cidade não encontrada, verifique se o nome está correto e tente novamente" })
      );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Previsao component", () => {
  it("Testa se está buscando a cidade correta", async () => {
    render(<Previsao />);

    // Aguarde a busca e a exibição dos resultados
    await screen.findByText("Nome da cidade");

    // Verifique se a cidade correta está sendo buscada
    expect(screen.getByLabelText("Digite o nome da cidade")).toHaveValue(
      "Belo Horizonte"
    );
  });
});
