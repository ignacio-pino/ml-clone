import { render, screen, fireEvent } from "@testing-library/react";
import ImageGallery from "../../../components/common/ImageGallery";

const samplePictures = [
  { id: "1", url: "url1" },
  { id: "2", url: "url2" },
  { id: "3", url: "url3" },
  { id: "4", url: "url4" },
  { id: "5", url: "url5" },
  { id: "6", url: "url6" },
];

describe("ImageGallery Component", () => {
  it("should match snapshot", () => {
    const container = render(
      <ImageGallery pictures={samplePictures} />
    ).container;
    expect(container).toMatchSnapshot();
  });
  it("displays main image initially as the first picture", async () => {
    render(<ImageGallery pictures={samplePictures} />);
    const mainImage = screen.getByRole("img", { name: "1" });

    expect(mainImage).toBeInTheDocument();
  });

  it("updates main image when an image button is clicked", async () => {
    render(<ImageGallery pictures={samplePictures} />);
    fireEvent.click(screen.getByTestId("imageButton-url2"));
    const mainImage = await screen.findByRole("img", { name: "2" });
    expect(mainImage).toBeInTheDocument();
  });

  it('shows a button with "+n more" when there are more than 6 images', () => {
    render(
      <ImageGallery
        pictures={[
          ...samplePictures,
          { id: "7", url: "url7" },
          { id: "8", url: "url8" },
        ]}
      />
    );
    const showMoreButton = screen.getByTestId("showMoreImagesButton");
    expect(showMoreButton).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent("+2");
  });

  it('opens a modal with all images when "+n more" button is clicked', () => {
    render(
      <ImageGallery
        pictures={[
          ...samplePictures,
          { id: "7", url: "url7" },
          { id: "8", url: "url8" },
        ]}
      />
    );
    const showMoreButton = screen.getByTestId("showMoreImagesButton");
    fireEvent.click(showMoreButton);

    samplePictures.forEach((picture) => {
      const imageInModal = screen.getByRole("img", {
        name: picture.id,
      });
      expect(imageInModal).toBeInTheDocument();
    });
  });
});
