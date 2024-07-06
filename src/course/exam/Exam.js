import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SubmissionExam, getExam } from "../../redux/examSlice";
import ExamHeader from "./ExamHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
import McqQuestion from "./McqQuestion";
import MultiAnsQuestion from "./MultiAnsQuestion";
import WrittenQuestion from "./WrittenQuestion";
import { Button } from "@mui/material";

export default function Exam() {
  const { id, examId } = useParams();
  const dispatch = useDispatch();
  const exam = useSelector((state) => state.exam.exam);
  const loading = useSelector((state) => state.exam.loading);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [studentinfo, setStudentinfo] = useState({
    email: user?.Email,
    examId: examId,
    grade: 0,
    questionssub: [],
  });

  const handleStudentAns = (questionId, answerIndex, type) => {
    setStudentinfo((prevInfo) => {
      const existingAnswer = prevInfo.questionssub.find(
        (ans) => ans.questionId === questionId
      );

      if (type === "mcq") {
        return {
          ...prevInfo,
          questionssub: existingAnswer
            ? prevInfo.questionssub.map((ans) =>
                ans.questionId === questionId
                  ? { ...ans, studentAnswer: answerIndex.toString() }
                  : ans
              )
            : [
                ...prevInfo.questionssub,
                { questionId, studentAnswer: answerIndex.toString() },
              ],
        };
      } else if (type === "multiple choice") {
        const answerArray = existingAnswer
          ? existingAnswer.studentAnswer.split("/")
          : [];
        const answerIndexStr = answerIndex.toString();
        const updatedAnswers = answerArray.includes(answerIndexStr)
          ? answerArray
              .filter((ans) => ans !== answerIndexStr)
              .sort()
              .join("/")
          : [...answerArray, answerIndexStr].sort().join("/");

        return {
          ...prevInfo,
          questionssub: existingAnswer
            ? prevInfo.questionssub.map((ans) =>
                ans.questionId === questionId
                  ? { ...ans, studentAnswer: updatedAnswers }
                  : ans
              )
            : [
                ...prevInfo.questionssub,
                { questionId, studentAnswer: updatedAnswers },
              ],
        };
      } else if (type === "written") {
        return {
          ...prevInfo,
          questionssub: existingAnswer
            ? prevInfo.questionssub.map((ans) =>
                ans.questionId === questionId
                  ? { ...ans, studentAnswer: answerIndex }
                  : ans
              )
            : [
                ...prevInfo.questionssub,
                { questionId, studentAnswer: answerIndex },
              ],
        };
      }

      return prevInfo;
    });
  };

  const questionsList = exam.Questions?.map((question, index) => {
    if (question.Type === "mcq") {
      return (
        <McqQuestion
          key={question.Id}
          question={question}
          order={index + 1}
          handleStudentAns={handleStudentAns}
        />
      );
    } else if (question.Type === "multiple choice") {
      return (
        <MultiAnsQuestion
          key={question.Id}
          question={question}
          order={index + 1}
          handleStudentAns={handleStudentAns}
        />
      );
    } else if (question.Type === "written") {
      return (
        <WrittenQuestion
          key={question.Id}
          question={question}
          order={index + 1}
          handleStudentAns={handleStudentAns}
        />
      );
    }
    return null;
  });

  useEffect(() => {
    dispatch(getExam(examId));
  }, [dispatch, examId]);

  const handleSubmit = () => {
    dispatch(SubmissionExam(studentinfo));
    navigate(`/auth/course/${id}`);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <Content>
      <StyledExamHeader examInfo={exam.exam} studentinfo={studentinfo} />
      <Questions>{questionsList}</Questions>
      <StyledSubmitBtn variant="contained" onClick={handleSubmit}>
        Submit
      </StyledSubmitBtn>
    </Content>
  );
}

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  flex-grow: 1000;
  padding-bottom: 10px;
`;

const StyledSubmitBtn = styled(Button)`
  position: fixed !important;
  bottom: 20px;
  right: 20px;
  background-color: #007bff !important;
  color: white !important;
  padding: 10px 20px !important;
  border-radius: 30px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3 !important;
  }
`;

const Content = styled.div`
  position: relative;
  padding: 20px;
  background: #ffffff;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const StyledExamHeader = styled(ExamHeader)`
  margin-bottom: 20px;
`;
