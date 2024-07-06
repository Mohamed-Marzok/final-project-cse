import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { enrollmentNewCourse } from "../redux/CoursesSlice";
import { useDispatch } from "react-redux";
export default function CourseEnrollment() {
  const [enrollmentForm, setEnrollmentForm] = useState({
    email: JSON.parse(localStorage.getItem("user")).Email,
    courseId: null,
  });
  const dispatch = useDispatch();
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        maxWidth: "30%",
        position: "fixed",
        bottom: "50px",
        right: "50px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enrollment"
        inputProps={{ "aria-label": "Enrollment" }}
        onChange={(e) =>
          setEnrollmentForm({
            ...enrollmentForm,
            courseId: parseInt(e.target.value),
          })
        }
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="add"
        onClick={() => dispatch(enrollmentNewCourse(enrollmentForm))}
      >
        <FileDownloadDoneIcon />
      </IconButton>
    </Paper>
  );
}
