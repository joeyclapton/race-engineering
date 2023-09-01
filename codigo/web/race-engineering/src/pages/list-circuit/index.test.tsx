import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import ListPage from "./index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ListPage component", () => {
    
  it("should validate if name and category are present on the screen", () => {  

    render(<ListPage />);
    // Verifica se a coluna da listagem existe
    const id = screen.getByText("ID");
    const name = screen.getByText("Name");
    const local = screen.getByText("Local");
    const edit = screen.getByText("Edit");
    const deletar = screen.getByText("Delete");
    

    
  });
});
