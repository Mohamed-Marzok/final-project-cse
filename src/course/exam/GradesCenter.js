import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getExamGrades } from "../../redux/gradeExam";

export function GradesCenter() {
  const { examId, id } = useParams();
  const examGrades = useSelector((state) => state.examGrade.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getExamGrades(examId));
  }, [examId]);
  console.log(examGrades);
  const handleLinkClick = (studentId) => {
    navigate(`/course/${id}/model/${examId}/${studentId}`);
  };
  const studentsList = useMemo(() => {
    return examGrades.map((grade) => {
      return (
        <tr>
          <StyledTd>{grade.ApplicationUser.UserName}</StyledTd>
          <StyledTd>{grade.Grade}</StyledTd>
          <StyledTd>
            <StyledLink
              onClick={() => handleLinkClick(grade.ApplicationUser.Id)}
            >
              link
            </StyledLink>
          </StyledTd>
        </tr>
      );
    });
  }, [examGrades, examId]);

  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Title</StyledTh>
            <StyledTh>Grade</StyledTh>
            <StyledTh>Model</StyledTh>
          </tr>
        </thead>
        <tbody>{studentsList}</tbody>
      </StyledTable>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  max-height: 100vh;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 80%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledTh = styled.th`
  background-color: #471fade3;
  color: #fff;
  padding: 12px;
  text-align: left;
  font-size: 16px;
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const StyledLink = styled.a`
  color: #471fade3;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
