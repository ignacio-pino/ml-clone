import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../../components/modules/Header";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Header Component", () => {
  const mockHeaderData = {
    categoryId: "categoryIdTest",
    categoryName: "categoryNameTest",
  };

  it("renders the search input correctly", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(
      "Busca productos, marcas y más..."
    );
    expect(input).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const container = render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("updates search value when typing into the search input", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(
      "Busca productos, marcas y más..."
    );
    fireEvent.change(input, { target: { value: "test search" } });
    expect(input).toHaveValue("test search");
  });

  it("checks the category checkbox when clicked", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );
    const checkbox = screen.getByRole("checkbox", {
      name: `Solo en ${mockHeaderData.categoryName}`,
    });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("calls navigate with correct parameters on search button click", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(
      "Busca productos, marcas y más..."
    );
    const checkbox = screen.getByRole("checkbox", {
      name: `Solo en ${mockHeaderData.categoryName}`,
    });
    const searchButton = screen.getByLabelText("Buscar");

    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.click(checkbox);
    fireEvent.click(searchButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "q=test+search&category=categoryIdTest",
    });
  });

  it("navigates with both searchValue and category when checkbox is checked", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Busca productos, marcas y más..."
    );
    const checkbox = screen.getByRole("checkbox", {
      name: `Solo en ${mockHeaderData.categoryName}`,
    });
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByLabelText("Buscar"));

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "q=test+search&category=categoryIdTest",
    });
  });

  it("navigates with only searchValue when checkbox is not checked", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Busca productos, marcas y más..."
    );
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.click(screen.getByLabelText("Buscar"));

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "q=test+search",
    });
  });

  it("navigates without a searchValue when input is empty", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText("Buscar"));

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "",
    });
  });

  it("calls handleClick function on submit", () => {
    render(
      <MemoryRouter>
        <Header {...mockHeaderData} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Busca productos, marcas y más..."
    );
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.submit(input);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "q=test+search",
    });
  });
});
