import { render, screen } from "@testing-library/react";
import ProductList from "../../../components/modules/ProductList";
import { MemoryRouter } from "react-router-dom";
import { IProductListData } from "../../../Interfaces";

describe("ProductList Component", () => {
  const mockProductDataList = [
    {
      id: "1",
      title: "Test Product 1",
      original_price: "100",
      price: "90",
      shipping: { free_shipping: true },
      thumbnail: "test_image_url_1",
      currency_id: "USD",
    },
    {
      id: "2",
      title: "Test Product 2",
      original_price: "",
      price: "80",
      shipping: { free_shipping: false },
      thumbnail: "test_image_url_2",
      currency_id: "UYU",
    },
  ];

  it("renders the ProductCard for each product", () => {
    render(
      <MemoryRouter>
        <ProductList
          productDataList={mockProductDataList as IProductListData[]}
        />
      </MemoryRouter>
    );

    mockProductDataList.forEach((product) => {
      const titleElement = screen.getByText(product.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it("passes the correct props to ProductCard", async () => {
    render(
      <MemoryRouter>
        <ProductList
          productDataList={mockProductDataList as IProductListData[]}
        />
      </MemoryRouter>
    );

    mockProductDataList.forEach(async (product) => {
      const card = await screen.findByTestId("productCard");
      expect(card).toHaveAttribute("id", product.id);
      expect(card).toHaveAttribute("title", product.title);
      expect(card).toHaveAttribute("price", product.price.toString());
      if (product.original_price) {
        expect(card).toHaveAttribute(
          "original_price",
          product.original_price.toString()
        );
      }
      expect(card).toHaveAttribute("thumbnail", product.thumbnail);
      expect(card).toHaveAttribute("currency_id", product.currency_id);
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ProductList
          productDataList={mockProductDataList as IProductListData[]}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
