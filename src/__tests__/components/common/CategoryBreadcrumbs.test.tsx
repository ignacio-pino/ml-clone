import { render, screen, fireEvent } from "@testing-library/react";
import CategoryBreadcrumbs from "../../../components/common/CategoryBreadcrumbs";
import { MemoryRouter, createSearchParams } from "react-router-dom";

const mockedUseNavigate = vitest.fn();

vitest.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("CategoryBreadcrumbs Component", () => {
  const mockPathFromRoot = [
    { id: "1", name: "Root" },
    { id: "2", name: "Level1" },
    { id: "3", name: "Level2" },
  ];

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
        <CategoryBreadcrumbs pathFromRoot={mockPathFromRoot} categoryId="3" />
      </MemoryRouter>
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders the breadcrumbs correctly", () => {
    render(
      <MemoryRouter>
        <CategoryBreadcrumbs pathFromRoot={mockPathFromRoot} categoryId="3" />
      </MemoryRouter>
    );

    const rootBreadcrumb = screen.getByText("Root");
    const level1Breadcrumb = screen.getByText("Level1");
    const level2Breadcrumb = screen.queryByText("Level2");

    expect(rootBreadcrumb).toBeInTheDocument();
    expect(level1Breadcrumb).toBeInTheDocument();
    expect(level2Breadcrumb).toBeNull();
  });

  it("calls the handleClick function with correct params when breadcrumb is clicked", () => {
    render(
      <MemoryRouter>
        <CategoryBreadcrumbs pathFromRoot={mockPathFromRoot} categoryId="3" />
      </MemoryRouter>
    );

    const rootBreadcrumb = screen.getByText("Root");

    fireEvent.click(rootBreadcrumb);

    expect(mockedUseNavigate).toHaveBeenCalledWith({
      pathname: "/products",
      search: "category=1",
    });
  });

  it("doesn't render the breadcrumb for the current category", () => {
    render(
      <MemoryRouter>
        <CategoryBreadcrumbs pathFromRoot={mockPathFromRoot} categoryId="2" />
      </MemoryRouter>
    );

    const level2Breadcrumb = screen.getByText("Level2");
    const level1Breadcrumb = screen.queryByText("Level1");

    expect(level2Breadcrumb).toBeInTheDocument();
    expect(level1Breadcrumb).toBeNull();
  });
});
