import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, createSearchParams } from "react-router-dom";
import FilterList from "../../../components/common/CategoryList";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("FilterList Component", () => {
  const mockValues = [
    { id: "1", name: "Value 1", results: 5 },
    { id: "2", name: "Value 2", results: 10 },
    { id: "3", name: "Value 3", results: 15 },
  ];

  const mockOverNineValues = [
    { id: "1", name: "Value 1", results: 5 },
    { id: "2", name: "Value 2", results: 10 },
    { id: "3", name: "Value 3", results: 15 },
    { id: "4", name: "Value 4", results: 20 },
    { id: "5", name: "Value 5", results: 25 },
    { id: "6", name: "Value 6", results: 30 },
    { id: "7", name: "Value 7", results: 35 },
    { id: "8", name: "Value 8", results: 40 },
    { id: "9", name: "Value 9", results: 45 },
    { id: "10", name: "Value 10", results: 50 },
    { id: "11", name: "Value 11", results: 55 },
    { id: "12", name: "Value 12", results: 60 },
  ];

  it("matches snapshot without mostrar mas button", () => {
    const container = render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="text"
          values={mockValues}
        />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with mostrar mas button", () => {
    const container = render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="text"
          values={mockOverNineValues}
        />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with range fields", () => {
    const container = render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="range"
          values={mockValues}
        />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders the filter name correctly", () => {
    render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="text"
          values={mockValues}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Filter")).toBeInTheDocument();
  });

  it("renders values correctly", () => {
    render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="text"
          values={mockValues}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Value 1")).toBeInTheDocument();
    expect(screen.getByText("(5)")).toBeInTheDocument();
  });

  it("shows up to 8 values by default if there are more than 9 values", () => {
    render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="text"
          values={mockOverNineValues}
        />
      </MemoryRouter>
    );

    const buttonElements = screen.getAllByRole("button");

    expect(buttonElements.length).toBe(9);
  });

  it("displays all values when 'Mostrar más' button is clicked", () => {
    render(
      <MemoryRouter>
        <FilterList
          id="test"
          name="Test Filter"
          type="text"
          values={mockOverNineValues}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Mostrar más"));

    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements.length).toBe(mockOverNineValues.length + 1);
  });

  it("renders RangeSelector when type is 'range'", () => {
    render(
      <MemoryRouter>
        <FilterList id="test" name="Test Filter" type="range" values={[]} />
      </MemoryRouter>
    );

    const minInput = screen.getByPlaceholderText("Min.");
    const maxInput = screen.getByPlaceholderText("Max.");

    expect(minInput).toBeInTheDocument();
    expect(maxInput).toBeInTheDocument();
  });

  it("updates the category correctly when a filter category button is clicked", () => {
    render(
      <MemoryRouter>
        <FilterList
          id="category"
          name="TestCategory"
          type="text"
          values={mockValues}
        />
      </MemoryRouter>
    );

    const button = screen.getByText("Value 1");
    fireEvent.click(button);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "category=1",
    });
  });

  it("adds new search param when a filter button is clicked", () => {
    const params = { category: "test" };
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/products", search: `${createSearchParams(params)}` },
        ]}
      >
        <FilterList
          id="testFilter"
          name="Test Filter"
          type="text"
          values={mockValues}
        />
      </MemoryRouter>
    );

    const button = screen.getByText("Value 1");
    fireEvent.click(button);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "category=test&testFilter=1",
    });
  });
});
