import React from "react";
import { render, screen } from "@testing-library/react";
import StrategyPage from "./index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ListPage component", () => {
    
  it("should validate if name and category are present on the screen", () => {  

    render(<StrategyPage />);

    // Verifica se a coluna da listagem existe
    
    const raceInfo = screen.getByText("Informações da corrida");
    const selectedRace = screen.getByText("Corrida selecionada");
    const raceStart = screen.getByText("Inicio da Corrida");
    const raceEnd = screen.getByText("Fim da corrida");
    const totalLaps = screen.getByText("Total de voltas");
    const pneu = screen.getByText("Tipo Pneu");
    const racer = screen.getByText("Piloto");
    const laps = screen.getByText("Número de voltas");
    const gas = screen.getByText("Quantidade de gasolina no tanque");
    

    
  });
});
