import React from "react";
import styled from "styled-components";

const ExamInfoTable = ({ examInfo, width }) => {
  return (
    <StyledTable style={{ width: width }}>
      <tbody>
        <tr>
          <StyledTh>Title</StyledTh>
          <StyledTd>{examInfo.Tittle}</StyledTd>
        </tr>
        <tr>
          <StyledTh>Description</StyledTh>
          <StyledTd>{examInfo.Describtion}</StyledTd>
        </tr>
        <tr>
          <StyledTh>Instructions</StyledTh>
          <StyledTd>{examInfo.Instructions}</StyledTd>
        </tr>
        <tr>
          <StyledTh>Date</StyledTh>
          <StyledTd>{examInfo.Date}</StyledTd>
        </tr>
        <tr>
          <StyledTh>Number Of Questions</StyledTh>
          <StyledTd>{examInfo.NumOfQuestions}</StyledTd>
        </tr>
        {/* <tr>
          <StyledTh>Grades</StyledTh>
          <StyledTd>{examInfo.Grades}</StyledTd>
        </tr> */}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: ${({ style }) => style?.width || "800px"};
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100% !important;
    box-shadow: none;
  }
`;

const StyledTh = styled.th`
  background-color: #007bff;
  color: #ffffff;
  width: 40%;
  border-bottom: 2px solid #0056b3;
  padding: 15px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
  }
`;

const StyledTd = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 15px;
  color: #333333;
  font-size: 15px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
  }
`;

export default ExamInfoTable;
