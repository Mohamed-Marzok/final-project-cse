import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { createAssignment } from "../../redux/assignmentsSlice";

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

export default function AssignmentModal({ open, handleClose }) {
  const [assignmentForm, setAssignmentForm] = React.useState({
    Title: "",
    Description: "",
    Grade: "",
    EndDate: "",
    File: null, // Initialize with null
  });
  const [formErrors, setFormErrors] = React.useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(createAssignment({ courseId: id, assignmentForm }));
      handleClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!assignmentForm.Title.trim()) errors.Title = "Title is required";
    if (!assignmentForm.Description.trim())
      errors.Description = "Description is required";
    if (!assignmentForm.Grade.trim()) errors.Grade = "Grade is required";
    if (!assignmentForm.EndDate.trim()) errors.EndDate = "End date is required";
    if (!assignmentForm.File) errors.File = "File is required"; // Check if File is null
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
          New Assignment
        </h2>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic-title"
            label="Title"
            variant="outlined"
            required
            error={!!formErrors.Title}
            helperText={formErrors.Title}
            onChange={(e) =>
              setAssignmentForm({ ...assignmentForm, Title: e.target.value })
            }
          />
          <TextField
            id="outlined-basic-description"
            label="Description"
            variant="outlined"
            required
            error={!!formErrors.Description}
            helperText={formErrors.Description}
            onChange={(e) =>
              setAssignmentForm({
                ...assignmentForm,
                Description: e.target.value,
              })
            }
          />
          <TextField
            id="outlined-basic-grade"
            label="Grade"
            type="number"
            variant="outlined"
            required
            error={!!formErrors.Grade}
            helperText={formErrors.Grade}
            inputProps={{ min: 0 }}
            onChange={(e) =>
              setAssignmentForm({
                ...assignmentForm,
                Grade: e.target.value,
              })
            }
          />
          <TextField
            id="outlined-basic-endDate"
            type="date"
            variant="outlined"
            required
            error={!!formErrors.EndDate}
            helperText={formErrors.EndDate}
            onChange={(e) =>
              setAssignmentForm({
                ...assignmentForm,
                EndDate: e.target.value,
              })
            }
          />
          <TextField
            id="outlined-basic-file"
            type="file"
            variant="outlined"
            required // Indicate that this field is required
            error={!!formErrors.File}
            helperText={formErrors.File}
            onChange={(e) =>
              setAssignmentForm({ ...assignmentForm, File: e.target.files[0] })
            }
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
