import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadAssginmentStudent } from "../../redux/assignmentGradeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function StudentUploadFile({ open, handleClose, assId }) {
  // Corrected function name
  const [formAss, setFormAss] = useState({
    UserEmail: JSON.parse(localStorage.getItem("user")).Email,
    AssignmentId: assId,
    File: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFormAss({
      ...formAss,
      File: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    dispatch(uploadAssginmentStudent(formAss));
    handleClose();
  };

  const validateForm = () => {
    const errors = {};
    if (!formAss.File) errors.File = "File is required";
    return errors;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2
          id="modal-modal-title"
          style={{ marginBottom: "20px", color: "#471fade3" }}
        >
          UpLoad Assignment
        </h2>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic-file"
            name="File"
            type="file"
            variant="outlined"
            onChange={handleFileChange}
            error={!!formErrors.File}
            helperText={formErrors.File}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
