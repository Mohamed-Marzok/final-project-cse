import React, { useState } from "react";
import styled from "styled-components";

export default function WrittenQuestion({ question, handleStudentAns, order }) {
  const [studentAnswer, setStudentAnswer] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setStudentAnswer(value);
    handleStudentAns(question.Id, value, "written");
  };

  return (
    <Mcq>
      <Header>
        <QuestionOrder>Question {order}</QuestionOrder>
        <Points>points: {question.Points}</Points>
      </Header>

      <QuestionText>{question.Text}</QuestionText>
      <CustomAnswerInput
        type="text"
        value={studentAnswer}
        onChange={handleInputChange}
        placeholder="Type your answer here"
      />
    </Mcq>
  );
}

const Mcq = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const QuestionOrder = styled.h3`
  color: #007bff;
`;

const Points = styled.p`
  color: #6c757d;
`;

const QuestionText = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const CustomAnswerInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
    outline: none;
  }
`;
