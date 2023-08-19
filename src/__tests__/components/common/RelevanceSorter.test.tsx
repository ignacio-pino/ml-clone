import { render, screen, fireEvent } from "@testing-library/react";
import RelevanceSorter from "../../../components/common/RelevanceSorter";
import { MemoryRouter, createSearchParams } from "react-router-dom";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
  useLocation: () => ({ search: "query=test" }),
}));

describe("RelevanceSorter Component", () => {
  const mockAvailableSorts = [
    { id: "price_asc", name: "Price: Low to High" },
    { id: "price_desc", name: "Price: High to Low" },
  ];
  const mockSelectedSort = { id: "relevance", name: "Relevance" };

  beforeEach(() => {
    mockedUseNavigate.mockClear();
  });

  it("matches snapshot", () => {
    const params = { sort: "relevance" };
    const container = render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <RelevanceSorter
          selectedSort={mockSelectedSort}
          availableSorts={mockAvailableSorts}
        />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders select with correct options", () => {
    const params = { sort: "relevance" };
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <RelevanceSorter
          selectedSort={mockSelectedSort}
          availableSorts={mockAvailableSorts}
        />
      </MemoryRouter>
    );

    const selectElement = screen.getByRole("combobox");
    const optionElements = screen.getAllByRole("option");

    expect(selectElement).toHaveTextContent(mockSelectedSort.name);
    expect(optionElements).toHaveLength(mockAvailableSorts.length + 1);
  });

  it("calls the handleChange function with correct params when an option is selected", () => {
    render(
      <MemoryRouter>
        <RelevanceSorter
          selectedSort={mockSelectedSort}
          availableSorts={mockAvailableSorts}
        />
      </MemoryRouter>
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "price_asc" } });

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "query=test&sort=price_asc",
    });
  });
});
