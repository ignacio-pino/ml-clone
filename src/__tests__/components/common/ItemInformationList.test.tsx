import { render, screen } from "@testing-library/react";
import ItemInformationList from "../../../components/common/ItemInformationList";
import { IItemInformationList } from "../../../Interfaces";

describe("ItemInformationList Component", () => {
  const sampleItemInformationList: IItemInformationList = {
    condition: "new",
    sold_quantity: 10,
    title: "Sample Item",
    original_price: 120,
    price: 100,
    currency_id: "UYU",
    shipping: {
      free_shipping: true,
    },
    available_quantity: 60,
  };

  it("should match snapshot", () => {
    const container = render(
      <ItemInformationList itemInformationList={sampleItemInformationList} />
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders item details correctly", () => {
    render(
      <ItemInformationList itemInformationList={sampleItemInformationList} />
    );

    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    expect(screen.getByText("+5 vendidos")).toBeInTheDocument();
    expect(screen.getByText("Sample Item")).toBeInTheDocument();
    expect(screen.getByText("$ 100")).toBeInTheDocument();
    expect(screen.getByText("$ 120")).toBeInTheDocument();
    expect(screen.getByText("16% OFF")).toBeInTheDocument();
    const shippingText = screen.getByText(/Llega gratis entre el/i);
    expect(shippingText).toBeInTheDocument();

    const boldTexts = shippingText.querySelectorAll("b");
    expect(boldTexts[0].textContent).toBe(" martes");
    expect(boldTexts[1].textContent).toBe("jueves");
    expect(screen.getByText("+50 disponibles")).toBeInTheDocument();
  });

  it("renders condition as 'Usado' when condition is not 'new'", () => {
    const newItemInfo: IItemInformationList = {
      ...sampleItemInformationList,
      condition: "used",
    };
    render(<ItemInformationList itemInformationList={newItemInfo} />);

    expect(screen.getByText("Usado")).toBeInTheDocument();
  });

  it("does not render original price or discount when original_price is not provided", () => {
    const newItemInfo: IItemInformationList = {
      ...sampleItemInformationList,
      original_price: 0,
    };
    render(<ItemInformationList itemInformationList={newItemInfo} />);

    expect(screen.queryByText("U$S 120")).not.toBeInTheDocument();
    expect(screen.queryByText("20% OFF")).not.toBeInTheDocument();
  });

  it("renders shipping cost when free_shipping is false", () => {
    const newItemInfo: IItemInformationList = {
      ...sampleItemInformationList,
      shipping: { free_shipping: false },
    };
    render(<ItemInformationList itemInformationList={newItemInfo} />);

    const shippingText = screen.getByText(/Llega entre el/i);
    expect(shippingText).toBeInTheDocument();

    const boldTexts = shippingText.querySelectorAll("b");
    expect(boldTexts[0].textContent).toBe(" martes");
    expect(boldTexts[1].textContent).toBe("jueves");
  });

  it("renders currency as U$S when currency_id is USD", () => {
    const newItemInfo: IItemInformationList = {
      ...sampleItemInformationList,
      currency_id: "USD",
    };
    render(<ItemInformationList itemInformationList={newItemInfo} />);

    expect(screen.getByText("U$S 100")).toBeInTheDocument();
  });
});
