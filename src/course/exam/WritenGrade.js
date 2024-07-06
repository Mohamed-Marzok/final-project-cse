import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useDispatch } from "react-redux";
import { updateStudentGrad } from "../../redux/gradeExam";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";

export default function WritenGrade({ question, order }) {
  const { examId, studentId } = useParams();

  const [dataForm, setDataForm] = useState({
    examId: parseInt(examId),
    studentId: studentId,
    answerPoints: "",
    questionId: question.Id,
  });

  const dispatch = useDispatch();

  const handleGradeChange = (e) => {
    setDataForm({
      ...dataForm,
      answerPoints: parseInt(e.target.value) || 0, // Ensure only numbers are set
    });
  };

  const handleUpdateClick = () => {
    dispatch(updateStudentGrad(dataForm));
  };

  return (
    <Writen>
      <Stack direction="column" spacing={2}>
        <HeaderWrapper>
          <Order>Question {order}</Order>
          <Points>Points: {question.Points}</Points>
        </HeaderWrapper>
        <QuestionText>{question.Text}</QuestionText>
        <StudentAnswerWrapper>
          <StudentAnswerLabel>Student's Answer:</StudentAnswerLabel>
          <StudentAnswer>{question.StudentAnswer[0]}</StudentAnswer>
        </StudentAnswerWrapper>
        <GradeSection>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: "100%",
              width: "400px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Add Student Grade"
              inputProps={{ "aria-label": "add student grade" }}
              onChange={handleGradeChange}
              type="number"
              value={dataForm.answerPoints}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="add"
              onClick={handleUpdateClick}
            >
              <FileDownloadDoneIcon />
            </IconButton>
          </Paper>
        </GradeSection>
      </Stack>
    </Writen>
  );
}

const Writen = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Order = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const Points = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const QuestionText = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 16px;
  word-wrap: break-word;
`;

const StudentAnswerWrapper = styled.div`
  background-color: #fefefe;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
`;

const StudentAnswerLabel = styled.div`
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
`;

const StudentAnswer = styled.div`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  word-wrap: break-word;
`;

const GradeSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;
