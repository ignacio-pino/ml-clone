import { render, screen } from "@testing-library/react";
import AttributeList from "../../../components/common/AttributeList";

describe("AttributeList Component", () => {
  const mockAttributeListData = [
    { id: "1", name: "Color", value_name: "Red" },
    { id: "2", name: "Size", value_name: "Medium" },
    { id: "3", name: "Material", value_name: "Cotton" },
  ];

  it("should match snapshot", () => {
    const container = render(
      <AttributeList attributeListData={mockAttributeListData} />
    ).container;
    expect(container).toMatchSnapshot();
  });

  it("renders attribute names and values correctly", () => {
    render(<AttributeList attributeListData={mockAttributeListData} />);

    const colorNameElement = screen.getByText("Color");
    const colorValueElement = screen.getByText("Red");
    const sizeNameElement = screen.getByText("Size");
    const sizeValueElement = screen.getByText("Medium");
    const materialNameElement = screen.getByText("Material");
    const materialValueElement = screen.getByText("Cotton");

    expect(colorNameElement).toBeInTheDocument();
    expect(colorValueElement).toBeInTheDocument();
    expect(sizeNameElement).toBeInTheDocument();
    expect(sizeValueElement).toBeInTheDocument();
    expect(materialNameElement).toBeInTheDocument();
    expect(materialValueElement).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    render(<AttributeList attributeListData={mockAttributeListData} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockAttributeListData.length);
  });
});
