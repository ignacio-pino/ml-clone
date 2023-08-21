import { render, screen, fireEvent } from "@testing-library/react";
import QuestionsList from "../../../components/common/QuestionsList";
import { IQuestionsList } from "../../../Interfaces";

const sampleQuestions: IQuestionsList[] = [
  {
    id: "q1",
    status: "ANSWERED",
    text: "What is the product made of?",
    answer: {
      text: "The product is made of wood.",
      date_created: "2023-01-01T12:00:00Z",
    },
  },
  {
    id: "q2",
    status: "UNANSWERED",
    text: "Is the product available in other colors?",
    answer: { text: "", date_created: "" },
  },
  {
    id: "q3",
    status: "ANSWERED",
    text: "How much does the product weigh?",
    answer: {
      text: "The product weighs 2kg.",
      date_created: "2023-02-05T12:00:00Z",
    },
  },
  {
    id: "q4",
    status: "UNANSWERED",
    text: "Can the product be customized?",
    answer: { text: "", date_created: "" },
  },
  {
    id: "q5",
    status: "ANSWERED",
    text: "How long is the warranty for the product?",
    answer: {
      text: "The product has a 1-year warranty.",
      date_created: "2023-03-01T10:00:00Z",
    },
  },
  {
    id: "q6",
    status: "ANSWERED",
    text: "Is the product waterproof?",
    answer: {
      text: "Yes, the product is waterproof.",
      date_created: "2023-03-20T09:00:00Z",
    },
  },
];

describe("QuestionsList Component", () => {
  it("should match snapshot", () => {
    const container = render(
      <QuestionsList questionsList={sampleQuestions} />
    ).container;
    expect(container).toMatchSnapshot();
  });

  it("displays provided questions and answers", () => {
    render(<QuestionsList questionsList={sampleQuestions} />);

    const questionElement1 = screen.getByText("What is the product made of?");
    1;
    const answerElement1 = screen.getByText("The product is made of wood.");
    const questionElement3 = screen.getByText(
      "How much does the product weigh?"
    );
    const answerElement3 = screen.getByText("The product weighs 2kg.");
    const questionElement5 = screen.getByText(
      "How long is the warranty for the product?"
    );
    const answerElement5 = screen.getByText(
      "The product has a 1-year warranty."
    );

    expect(questionElement1).toBeInTheDocument();
    expect(answerElement1).toBeInTheDocument();
    expect(questionElement3).toBeInTheDocument();
    expect(answerElement3).toBeInTheDocument();
    expect(questionElement5).toBeInTheDocument();
    expect(answerElement5).toBeInTheDocument();
  });

  it("displays a message if there are no questions", () => {
    render(<QuestionsList questionsList={[]} />);

    const noQuestionsMessage = screen.getByText(
      "Todavía no hay preguntas. ¡Sé el primero en preguntar!"
    );
    expect(noQuestionsMessage).toBeInTheDocument();
  });

  it("shows only first 5 questions by default if there are more than 5 questions", () => {
    const extendedQuestions = [...sampleQuestions, ...sampleQuestions];

    render(<QuestionsList questionsList={extendedQuestions} />);

    const showAllQuestionsButton = screen.getByText(
      "Mostrar todas las preguntas"
    );
    expect(showAllQuestionsButton).toBeInTheDocument();
  });

  it("opens a modal when 'Mostrar todas las preguntas' button is clicked", () => {
    const extendedQuestions = [...sampleQuestions, ...sampleQuestions];

    render(<QuestionsList questionsList={extendedQuestions} />);

    const showAllQuestionsButton = screen.getByText(
      "Mostrar todas las preguntas"
    );
    fireEvent.click(showAllQuestionsButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("correctly formats the date of the answer", () => {
    render(<QuestionsList questionsList={sampleQuestions} />);

    const formattedDate1 = screen.getByText("01/01/2023");
    const formattedDate3 = screen.getByText("05/02/2023");
    const formattedDate5 = screen.getByText("01/03/2023");

    expect(formattedDate1).toBeInTheDocument();
    expect(formattedDate3).toBeInTheDocument();
    expect(formattedDate5).toBeInTheDocument();
  });
});
