import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getAssignmentGrades,
  updateStudentGrad,
} from "../../redux/assignmentGradeSlice";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import PopFile from "../PopFile";
export default function AssGradCenter() {
  const { assId } = useParams();
  const assGrades = useSelector((state) => state.assGrade.data);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    AssignmentId: parseInt(assId),
    UserId: null,
    Grade: null,
  });

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = (file) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getAssignmentGrades(assId));
  }, [assId, dispatch]);

  const handleGradeChange = (e, userId) => {
    setFormData({
      ...formData,
      Grade: parseInt(e.target.value),
      UserId: userId,
    });
  };

  const handleSubmitGrade = (userId) => {
    dispatch(updateStudentGrad(formData));
  };
  console.log(assGrades);
  const assGradeList = useMemo(() => {
    return assGrades.map((grade) => {
      const byteCharacters = atob(grade.File);
      const byteArray = Uint8Array.from(byteCharacters, (char) =>
        char.charCodeAt(0)
      );
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      return (
        <tr key={grade.ApplicationUserId}>
          <StyledTd>{grade.ApplicationUser.UserName}</StyledTd>
          <StyledTd style={{ textAlign: "center" }}>
            <StyledLink href="#" onClick={() => handleOpen(url)}>
              File
            </StyledLink>
          </StyledTd>
          <StyledTd
            style={{
              textAlign: "center",
              // color: grade.Grade > 5 ? "green" : "red",
            }}
          >
            {grade.Grade}
          </StyledTd>
          <StyledTd style={{ minWidth: "110px" }}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Add Student Grade"
                inputProps={{ "aria-label": "add student grade" }}
                onChange={(e) => handleGradeChange(e, grade.ApplicationUserId)}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="add"
                onClick={() => handleSubmitGrade(grade.ApplicationUserId)}
              >
                <FileDownloadDoneIcon />
              </IconButton>
            </Paper>
          </StyledTd>
        </tr>
      );
    });
  }, [assGrades, formData, assId]);

  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Name</StyledTh>
            <StyledTh style={{ textAlign: "center" }}>File</StyledTh>
            <StyledTh style={{ textAlign: "center" }}>Grade</StyledTh>
            <StyledTh>Update Grade</StyledTh>
          </tr>
        </thead>
        <tbody>{assGradeList}</tbody>
      </StyledTable>

      <PopFile open={open} onClose={handleClose} selectedFile={selectedFile} />
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
  position: relative;
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
