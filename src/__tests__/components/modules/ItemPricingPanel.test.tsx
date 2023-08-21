import { render, screen } from "@testing-library/react";
import ItemPricingPanel from "../../../components/modules/ItemPricingPanel";
import { IItemInformationList } from "../../../Interfaces";

describe("ItemPricingPanel Component", () => {
  const sampleItemInformation: IItemInformationList = {
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
  const samplePaymentMethods = [
    {
      payment_type_id: "credit_card",
      id: "1",
      thumbnail: "thumbnail-url-1",
    },
    {
      payment_type_id: "debit_card",
      id: "2",
      thumbnail: "thumbnail-url-2",
    },
  ];

  it("should match snapshot", () => {
    const container = render(
      <ItemPricingPanel
        itemInformation={sampleItemInformation}
        paymentMethods={samplePaymentMethods}
      />
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders item information correctly", () => {
    render(
      <ItemPricingPanel
        itemInformation={sampleItemInformation}
        paymentMethods={samplePaymentMethods}
      />
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

  it("renders payment methods correctly", () => {
    render(
      <ItemPricingPanel
        itemInformation={sampleItemInformation}
        paymentMethods={samplePaymentMethods}
      />
    );

    const creditCardText = screen.getByText("Tarjetas de Crédito");
    expect(creditCardText).toBeInTheDocument();

    const debitCardText = screen.getByText("Tarjetas de Débito");
    expect(debitCardText).toBeInTheDocument();

    const ticketText = screen.getByText("Efectivo");
    expect(ticketText).toBeInTheDocument();
  });
});
