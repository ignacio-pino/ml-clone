import { render, screen } from "@testing-library/react";
import PaymentMethodList from "../../../components/common/PaymentMethodList";
import { IPaymentMethods } from "../../../Interfaces";

describe("PaymentMethodList", () => {
  const samplePaymentMethods: IPaymentMethods[] = [
    {
      payment_type_id: "credit_card",
      id: "1",
      thumbnail: "image1.jpg",
    },
    {
      payment_type_id: "debit_card",
      id: "2",
      thumbnail: "image2.jpg",
    },
    {
      payment_type_id: "ticket",
      id: "3",
      thumbnail: "image3.jpg",
    },
  ];

  it("should match snapshot", () => {
    const container = render(
      <PaymentMethodList paymentMethods={samplePaymentMethods} />
    ).container;

    expect(container).toMatchSnapshot();
  });

  it("renders credit card payment methods correctly", () => {
    render(<PaymentMethodList paymentMethods={samplePaymentMethods} />);

    const creditCardImage = screen.getByAltText(
      "image1.jpg"
    ) as HTMLImageElement;
    expect(creditCardImage.src.endsWith("image1.jpg")).toBe(true);
  });

  it("renders debit card payment methods correctly", () => {
    render(<PaymentMethodList paymentMethods={samplePaymentMethods} />);

    const debitCardImage = screen.getByAltText(
      "image2.jpg"
    ) as HTMLImageElement;
    expect(debitCardImage.src.endsWith("image2.jpg")).toBe(true);
  });

  it("renders cash payment methods correctly", () => {
    render(<PaymentMethodList paymentMethods={samplePaymentMethods} />);

    const ticketImage = screen.getByAltText("image3.jpg") as HTMLImageElement;
    expect(ticketImage.src.endsWith("image3.jpg")).toBe(true);
  });

  it("renders the payment method information", () => {
    render(<PaymentMethodList paymentMethods={samplePaymentMethods} />);

    const creditCardText = screen.getByText("Tarjetas de Crédito");
    expect(creditCardText).toBeInTheDocument();

    const debitCardText = screen.getByText("Tarjetas de Débito");
    expect(debitCardText).toBeInTheDocument();

    const ticketText = screen.getByText("Efectivo");
    expect(ticketText).toBeInTheDocument();
  });
});
