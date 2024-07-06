import React, { useState } from "react";
import { Stack, Checkbox } from "@mui/material";
import styled from "styled-components";

export default function MultiAnsQuestion({
  question,
  handleStudentAns,
  order,
}) {
  const handleCheckboxChange = (e, index) => {
    handleStudentAns(question.Id, index, "multiple choice");
  };

  const optionsList = question.Options.map((option, index) => (
    <OptionItem key={index}>
      <StyledCheckbox
        id={index}
        onChange={(e) => handleCheckboxChange(e, index)}
      />
      <OptionText htmlFor={index}>{option}</OptionText>
    </OptionItem>
  ));

  return (
    <Mcq>
      <Header
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <QuestionOrder>Question {order}</QuestionOrder>
        <Points>points: {question.Points}</Points>
      </Header>

      <QuestionText>{question.Text}</QuestionText>
      <Options>{optionsList}</Options>
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

const Header = styled(Stack)`
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

const Options = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  color: #007bff;
`;

const OptionText = styled.label`
  list-style: none;
  color: #555;
`;
