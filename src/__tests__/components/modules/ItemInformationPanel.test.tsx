import { render, screen } from "@testing-library/react";
import ItemInformationPanel from "../../../components/modules/ItemInformationPanel";
import {
  IPictureList,
  IAttributeListData,
  IQuestionsList,
} from "../../../Interfaces";

describe("ItemInformationPanel Component", () => {
  const mockPictures: IPictureList[] = [
    { id: "1", url: "url1" },
    { id: "2", url: "url2" },
  ];

  const mockAttributes: IAttributeListData[] = [
    { id: "1", name: "Brand", value_name: "Apple" },
    { id: "2", name: "Memory", value_name: "16GB" },
  ];

  const mockQuestions: IQuestionsList[] = [
    {
      id: "1",
      status: "ANSWERED",
      text: "Is this brand new?",
      answer: {
        text: "Yes, it's brand new.",
        date_created: "2023-08-18",
      },
    },
  ];

  it("should match snapshot", () => {
    const container = render(
      <ItemInformationPanel
        pictureList={mockPictures}
        attributeList={mockAttributes}
        description="A great product."
        questions={mockQuestions}
      />
    ).container;
    expect(container).toMatchSnapshot();
  });

  it("renders image gallery correctly", () => {
    render(
      <ItemInformationPanel
        pictureList={mockPictures}
        attributeList={mockAttributes}
        description="A great product."
        questions={mockQuestions}
      />
    );
    const imageElement = screen.getByRole("img", { name: "1" });
    expect(imageElement).toBeInTheDocument();
  });

  it("renders attributes correctly", () => {
    render(
      <ItemInformationPanel
        pictureList={mockPictures}
        attributeList={mockAttributes}
        description="A great product."
        questions={mockQuestions}
      />
    );
    const attributeName = screen.getByText("Brand");
    const attributeValue = screen.getByText("Apple");

    expect(attributeName).toBeInTheDocument();
    expect(attributeValue).toBeInTheDocument();
  });

  it("renders description correctly", () => {
    render(
      <ItemInformationPanel
        pictureList={mockPictures}
        attributeList={mockAttributes}
        description="A great product."
        questions={mockQuestions}
      />
    );
    const description = screen.getByText("A great product.");
    expect(description).toBeInTheDocument();
  });

  it("renders questions correctly", () => {
    render(
      <ItemInformationPanel
        pictureList={mockPictures}
        attributeList={mockAttributes}
        description="A great product."
        questions={mockQuestions}
      />
    );
    const questionText = screen.getByText("Is this brand new?");
    const answerText = screen.getByText("Yes, it's brand new.");
    expect(questionText).toBeInTheDocument();
    expect(answerText).toBeInTheDocument();
  });
});
