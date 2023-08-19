import { render, screen, fireEvent } from "@testing-library/react";
import RangeSelector from "../../../components/common/RangeSelector";
import { MemoryRouter, createSearchParams } from "react-router-dom";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("RangeSelector Component", () => {
  beforeEach(() => {
    mockedUseNavigate.mockClear();
  });

  it("matches snapshot", () => {
    const params = { category: "test" };
    const container = render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <RangeSelector />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("updates input values correctly", () => {
    render(
      <MemoryRouter>
        <RangeSelector />
      </MemoryRouter>
    );

    const minInput = screen.getByPlaceholderText("Min.");
    const maxInput = screen.getByPlaceholderText("Max.");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "100" } });

    expect(minInput).toHaveDisplayValue("10");
    expect(maxInput).toHaveDisplayValue("100");
  });

  it("calls the handleClick function with correct search params", () => {
    render(
      <MemoryRouter>
        <RangeSelector />
      </MemoryRouter>
    );

    const minInput = screen.getByPlaceholderText("Min.");
    const maxInput = screen.getByPlaceholderText("Max.");
    const submitButton = screen.getByLabelText("Buscar rango");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "100" } });

    fireEvent.click(submitButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "price=10.0-100.0",
    });
  });

  it("handles only min value correctly in handleClick", () => {
    render(
      <MemoryRouter>
        <RangeSelector />
      </MemoryRouter>
    );

    const minInput = screen.getByPlaceholderText("Min.");
    const submitButton = screen.getByLabelText("Buscar rango");

    fireEvent.change(minInput, { target: { value: "10" } });

    fireEvent.click(submitButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "price=10.0-*",
    });
  });

  it("handles only max value correctly in handleClick", () => {
    render(
      <MemoryRouter>
        <RangeSelector />
      </MemoryRouter>
    );

    const maxInput = screen.getByPlaceholderText("Max.");
    const submitButton = screen.getByLabelText("Buscar rango");

    fireEvent.change(maxInput, { target: { value: "100" } });

    fireEvent.click(submitButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "price=*-100.0",
    });
  });
});
