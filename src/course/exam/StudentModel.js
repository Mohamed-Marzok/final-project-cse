import React, { useEffect, useMemo } from "react";
import ExamInfoTable from "./ExamInfoTable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudentModel } from "../../redux/gradeExam";
import styled from "styled-components";
import McqGrade from "./McqGrade";
import MultiAnsGrade from "./MultiAnsGrade";
import WritenGrade from "./WritenGrade";

export default function StudentModel() {
  const studentModel = useSelector((state) => state.examGrade.model);
  const loading = useSelector((state) => state.examGrade.loading);
  const { examId, studentId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentModel({ examId, studentId }));
  }, [dispatch, examId, studentId]);

  const studentQuestionsList = useMemo(() => {
    if (!studentModel || !studentModel.Questions) {
      return null;
    }
    return studentModel.Questions.map((question, index) => {
      if (question.Type === "mcq") {
        return (
          <McqGrade key={question.Id} question={question} order={index + 1} />
        );
      } else if (question.Type === "multiple choice") {
        return (
          <MultiAnsGrade
            key={question.Id}
            question={question}
            order={index + 1}
          />
        );
      }
      return (
        <WritenGrade key={question.Id} question={question} order={index + 1} />
      );
    });
  }, [studentModel]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!studentModel || !studentModel.exam) {
    return <p>No data available</p>;
  }

  return (
    <Content>
      <ExamInfoTable examInfo={studentModel.exam} width={"100%"} />
      <Questions>{studentQuestionsList}</Questions>
    </Content>
  );
}

const Content = styled.div`
  margin: 20px auto;
  height: 90vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
`;
const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
`;
