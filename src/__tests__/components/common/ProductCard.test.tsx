import { render, screen } from "@testing-library/react";
import ProductCard from "../../../components/common/ProductCard";
import { IProductCard } from "../../../Interfaces";

describe("ProductCard", () => {
  const sampleProduct: IProductCard = {
    title: "Sample Product",
    price: "100.00",
    currency_id: "UYU",
    original_price: "120.00",
    free_shipping: true,
    thumbnail: "sample-thumbnail-url",
  };

  it("should match snapshot", () => {
    const productCard = render(<ProductCard {...sampleProduct} />).container;

    expect(productCard).toMatchSnapshot();
  });

  it("renders product details correctly", () => {
    render(<ProductCard {...sampleProduct} />);

    const titleElement = screen.getByText("Sample Product");
    const priceElement = screen.getByText("$ 100");
    const originalPriceElement = screen.getByText("$ 120");
    const discountElement = screen.getByText("16% OFF");
    const freeShippingElement = screen.getByText("Envío gratis");
    const thumbnailElement = screen.getByAltText("Sample Product");

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(originalPriceElement).toBeInTheDocument();
    expect(discountElement).toBeInTheDocument();
    expect(freeShippingElement).toBeInTheDocument();
    expect(thumbnailElement).toBeInTheDocument();
  });

  it("renders discount element only when original_price is provided", () => {
    render(<ProductCard {...{ ...sampleProduct, original_price: "" }} />);

    const discountElement = screen.queryByText("16% OFF");
    const originalPriceElement = screen.queryByText("$ 120");

    expect(discountElement).not.toBeInTheDocument();
    expect(originalPriceElement).not.toBeInTheDocument();
  });

  it("renders free shipping element only when free_shipping is true", () => {
    render(<ProductCard {...{ ...sampleProduct, free_shipping: false }} />);

    const freeShippingElement = screen.queryByText("Envío gratis");
    expect(freeShippingElement).not.toBeInTheDocument();
  });

  it("renders currency as U$S when currency_id is USD", () => {
    render(<ProductCard {...{ ...sampleProduct, currency_id: "USD" }} />);

    const priceElement = screen.getByText("U$S 100");
    const originalPriceElement = screen.getByText("U$S 120");

    expect(priceElement).toBeInTheDocument();
    expect(originalPriceElement).toBeInTheDocument();
  });
});
