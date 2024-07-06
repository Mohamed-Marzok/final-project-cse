import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createLecture } from "../../redux/lecturesSlice";
import { useParams } from "react-router-dom";

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

export default function BasicModal({ open, handleClose }) {
  const [lectureForm, setLectureForm] = React.useState({
    Name: "",
    Description: "",
    Link: "",
    File: null,
  });
  const [formErrors, setFormErrors] = React.useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(createLecture({ courseId: id, lectureForm }));
      handleClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!lectureForm.Name.trim()) errors.Name = "Name is required";
    if (!lectureForm.Description.trim())
      errors.Description = "Description is required";
    // if (!lectureForm.Link.trim()) errors.Link = "Link is required";
    if (!lectureForm.File) errors.File = "File is required";
    return errors;
  };

  return (
    <div>
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
            New Lecture
          </h2>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic-name"
              label="Name"
              variant="outlined"
              required
              error={!!formErrors.Name}
              helperText={formErrors.Name}
              onChange={(e) =>
                setLectureForm({ ...lectureForm, Name: e.target.value })
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
                setLectureForm({
                  ...lectureForm,
                  Description: e.target.value,
                })
              }
            />
            {/* <TextField
              id="outlined-basic-link"
              label="Link"
              variant="outlined"
              required
              error={!!formErrors.Link}
              helperText={formErrors.Link}
              onChange={(e) =>
                setLectureForm({
                  ...lectureForm,
                  Link: e.target.value,
                })
              }
            /> */}
            <TextField
              id="outlined-basic-file"
              type="file"
              variant="outlined"
              required
              error={!!formErrors.File}
              helperText={formErrors.File}
              onChange={(e) =>
                setLectureForm({
                  ...lectureForm,
                  File: e.target.files[0],
                })
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
    </div>
  );
}
