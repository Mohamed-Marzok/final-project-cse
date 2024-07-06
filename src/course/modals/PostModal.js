import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/PostSlice";
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

export default function PostModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    UserEmail: JSON.parse(localStorage.getItem("user")).Email,
    Tittle: "",
    Content: "",
    File: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      File: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(createPost({ courseId: id, postForm: formData }));
      handleClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.Tittle.trim()) errors.Tittle = "Title is required";
    if (!formData.Content.trim()) errors.Content = "Content is required";
    // if (!formData.File) errors.File = "File is required";
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
          New Post
        </h2>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic-title"
            name="Tittle"
            label="Title"
            variant="outlined"
            error={!!formErrors.Tittle}
            helperText={formErrors.Tittle}
            value={formData.Tittle}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic-content"
            name="Content"
            label="Content"
            multiline
            rows={4}
            variant="outlined"
            error={!!formErrors.Content}
            helperText={formErrors.Content}
            value={formData.Content}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic-file"
            name="File"
            type="file"
            variant="outlined"
            onChange={handleFileChange}
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
