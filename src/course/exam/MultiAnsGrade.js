import React from "react";
import styled from "styled-components";

export default function MultiAnsGrade({ question, order }) {
  const correctAnswers = question.CorrectAnswr.map(Number);
  const studentAnswers = question.StudentAnswer.map(Number);

  const optionsList = question.Options.map((option, index) => {
    const isCorrectAnswer = correctAnswers.includes(index);
    const isStudentAnswer = studentAnswers.includes(index);
    const isCorrectAndStudentAnswer = isCorrectAnswer && isStudentAnswer;

    return (
      <OptionWrapper key={index}>
        <OuterSquare
          style={{
            borderColor:
              isCorrectAnswer && !isStudentAnswer ? "green" : "black",
          }}
        >
          <InnerSquare
            style={{
              backgroundColor: isCorrectAndStudentAnswer
                ? "green"
                : isStudentAnswer
                ? "red"
                : "",
            }}
          />
        </OuterSquare>
        <OptionText>{option}</OptionText>
      </OptionWrapper>
    );
  });

  return (
    <MultiAns>
      <Header>
        <Order>Question {order}</Order>
        <Points>Points: {question.Points}</Points>
      </Header>
      <QuestionText>{question.Text}</QuestionText>
      <OptionsList>{optionsList}</OptionsList>
    </MultiAns>
  );
}

const MultiAns = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: 1px solid #ddd;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Order = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #007bff;
`;

const Points = styled.span`
  font-size: 16px;
  color: #666;
`;

const QuestionText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
`;

const OptionsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const OuterSquare = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid black;
  background-color: transparent;
  display: grid;
  place-items: center;
`;

const InnerSquare = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  z-index: 1000;
`;

const OptionText = styled.li`
  margin: 0;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
`;
