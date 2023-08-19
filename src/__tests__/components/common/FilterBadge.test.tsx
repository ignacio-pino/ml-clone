import { render, screen, fireEvent } from "@testing-library/react";
import FilterBadge from "../../../components/common/FilterBadge";
import { MemoryRouter, createSearchParams } from "react-router-dom";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("FilterBadge Component", () => {
  const mockFilter = {
    id: "testId",
    name: "testName",
    type: "text",
    values: [{ id: "valuesTestId", name: "valuesTestName" }],
  };

  it("matches snapshot", () => {
    const params = { category: "test" };
    const container = render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <FilterBadge {...mockFilter} />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders the filter badge with correct text", () => {
    const params = { category: "test" };
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <FilterBadge {...mockFilter} />
      </MemoryRouter>
    );
    const badge = screen.getByText("valuesTestName");
    expect(badge).toBeInTheDocument();
  });

  it("calls the handleClick function when close button is clicked", () => {
    const params = { category: "test", testId: "testId" };
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <FilterBadge {...mockFilter} />
      </MemoryRouter>
    );

    const closeButton = screen.getByLabelText(/Eliminar filtro/i);
    fireEvent.click(closeButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "category=test",
    });
  });
});
