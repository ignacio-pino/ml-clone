import { render, screen } from "@testing-library/react";
import NavigationSidebar from "../../../components/modules/NavigationSidebar";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("NavigationSidebar Component", () => {
  const mockCategoryData = {
    categoryInformation: {
      id: "12345",
      name: "TestCategory",
      path_from_root: [{ id: "Test path", name: "test name" }],
    },
    query: "",
    totalResults: 10,
    childrenCategories: [],
  };

  const mockFilterDataList = {
    filters: [
      {
        id: "category",
        name: "TestCategory",
        values: [{ id: "test", name: "test category name" }],
        type: "text",
      },
      {
        id: "filter1",
        name: "TestFilter1",
        values: [{ id: "test", name: "test filter 1 name" }],
        type: "text",
      },
    ],
    availableFilters: [
      {
        id: "availableFilter1",
        name: "TestAvailableFilter1",
        values: [{ id: "test", name: "test available filter 1 name" }],
        type: "text",
      },
    ],
  };

  it("matches snapshot", () => {
    const container = render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={mockCategoryData}
        />
      </MemoryRouter>
    ).container;
    expect(container).toMatchSnapshot();
  });

  it("renders the category name if categoryInformation is present", () => {
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={mockCategoryData}
        />
      </MemoryRouter>
    );
    const categoryName = screen.getByText("TestCategory");
    expect(categoryName).toBeInTheDocument();
  });

  it("renders capitalized query if query is present and categoryInformation is not", () => {
    const alteredMockCategoryData = {
      ...mockCategoryData,
      categoryInformation: undefined,
      query: "testquery",
    };
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={alteredMockCategoryData}
        />
      </MemoryRouter>
    );
    const queryName = screen.getByText("Testquery");
    expect(queryName).toBeInTheDocument();
  });

  it("renders 'Sin resultados' if neither categoryInformation nor query is present", () => {
    const alteredMockCategoryData = {
      ...mockCategoryData,
      categoryInformation: undefined,
      query: "",
    };
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={alteredMockCategoryData}
        />
      </MemoryRouter>
    );
    const noResults = screen.getByText("Sin resultados");
    expect(noResults).toBeInTheDocument();
  });

  it("renders total results correctly", () => {
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={mockCategoryData}
        />
      </MemoryRouter>
    );
    const totalResults = screen.getByText("10 resultados");
    expect(totalResults).toBeInTheDocument();
  });

  it("renders FilterBadge for each filter except 'category'", () => {
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={mockCategoryData}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText("test category name")).not.toBeInTheDocument();
    expect(screen.getByText("test filter 1 name")).toBeInTheDocument();
  });

  it("renders CategoryList for childrenCategories", () => {
    const alteredMockCategoryData = {
      ...mockCategoryData,
      childrenCategories: [
        { id: "testchildren1", name: "Child Category 1", results: 10 },
      ],
    };
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={alteredMockCategoryData}
        />
      </MemoryRouter>
    );
    const childCategory = screen.getByText("Child Category 1");
    expect(childCategory).toBeInTheDocument();
  });

  it("renders CategoryList for each availableFilter", () => {
    render(
      <MemoryRouter>
        <NavigationSidebar
          filterDataList={mockFilterDataList}
          categoryData={mockCategoryData}
        />
      </MemoryRouter>
    );
    const availableFilter = screen.getByText("TestAvailableFilter1");
    expect(availableFilter).toBeInTheDocument();
  });
});
