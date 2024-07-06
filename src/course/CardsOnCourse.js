import React from "react";
import { Button, Card, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import StudentUploadFile from "./assignment/StudentUpLoadFile";
import PopFile from "./PopFile";

const role = JSON.parse(localStorage.getItem("role"));

export const AssignmentCard = ({ assignment, deleteFun }) => {
  const { id } = useParams();
  const assId = assignment.Id;
  const navigate = useNavigate();
  const [openUploadModal, setOpenUploadModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  let url;

  const handleClose = () => setOpen(false);
  if (assignment && assignment.File) {
    const byteCharacters = atob(assignment.File);
    const byteArray = Uint8Array.from(byteCharacters, (char) =>
      char.charCodeAt(0)
    );
    const blob = new Blob([byteArray], { type: "application/pdf" });
    url = URL.createObjectURL(blob);
  }

  const handleOpenAssignment = () => {
    setSelectedFile(url);
    setOpen(true);
  };

  const handleUploadOpen = () => setOpenUploadModal(true);
  const handleUploadClose = () => setOpenUploadModal(false);
  const hadelGradClick = () => navigate(`/course/${id}/assgrade/${assId}`);

  return (
    <ContentCard key={assignment.Id}>
      <Stack
        sx={{ height: "100%" }}
        direction="column"
        justifyContent="space-between"
      >
        <div>
          <StyledH3>{assignment.Tittle}</StyledH3>
          <StyledP>{assignment.Describtion}</StyledP>
        </div>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleOpenAssignment}>
            Open
          </Button>
          {role === "Instructor" ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={hadelGradClick}
            >
              Grade
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleUploadOpen}
            >
              Upload
            </Button>
          )}
        </Stack>
      </Stack>
      {role === "Instructor" && (
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
          }}
          color="error"
          size="small"
          onClick={deleteFun}
        >
          <DeleteIcon />
        </IconButton>
      )}
      {openUploadModal && (
        <StudentUploadFile
          open={openUploadModal}
          handleClose={handleUploadClose}
          assId={assignment.Id}
        />
      )}
      <PopFile open={open} onClose={handleClose} selectedFile={selectedFile} />
    </ContentCard>
  );
};

export const ExamCard = ({ exam, deleteFun }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const examId = exam.Id;

  const handleOpenExam = () => navigate(`/course/${id}/exam/${examId}`);
  const handleGradExam = () => navigate(`/course/${id}/grade/${examId}`);

  return (
    <ContentCard key={exam.Id}>
      <Stack
        sx={{ height: "100%" }}
        direction="column"
        justifyContent="space-between"
      >
        <div>
          <StyledH3>{exam.Tittle}</StyledH3>
          <StyledP>{exam.Describtion}</StyledP>
        </div>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleOpenExam}>
            Open
          </Button>
          {role === "Instructor" && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleGradExam}
            >
              Grade
            </Button>
          )}
        </Stack>
      </Stack>
      {role === "Instructor" && (
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
          }}
          color="error"
          size="small"
          onClick={deleteFun}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </ContentCard>
  );
};

export const LectureCard = ({ lecture, deleteFun }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  let url;

  const handleClose = () => setOpen(false);
  if (lecture && lecture.LecFile) {
    const byteCharacters = atob(lecture.LecFile);
    const byteArray = Uint8Array.from(byteCharacters, (char) =>
      char.charCodeAt(0)
    );
    const blob = new Blob([byteArray], { type: "application/pdf" });
    url = URL.createObjectURL(blob);
  }

  const handleOpenLecture = () => {
    setSelectedFile(url);
    setOpen(true);
  };

  return (
    <ContentCard key={lecture.id}>
      <Stack
        sx={{ height: "100%" }}
        direction="column"
        justifyContent="space-between"
      >
        <div>
          <StyledH3>{lecture.Name}</StyledH3>
          <StyledP>{lecture.Description}</StyledP>
        </div>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleOpenLecture}>
            Open
          </Button>
        </Stack>
      </Stack>
      {role === "Instructor" && (
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
          }}
          color="error"
          size="small"
          onClick={deleteFun}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <PopFile open={open} onClose={handleClose} selectedFile={selectedFile} />
    </ContentCard>
  );
};

const ContentCard = styled(Card)`
  position: relative;
  width: 300px;
  height: 200px;
  padding: 16px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: #fff;
`;

const StyledH3 = styled.h3`
  color: #471fade3;
  font-size: 1.2rem;
  margin: 0 0 8px 0;
`;

const StyledP = styled.p`
  color: #777;
  overflow: auto;
  margin: 0;
  font-size: 0.9rem;
  &::-webkit-scrollbar {
    width: 1px;
  }
`;
