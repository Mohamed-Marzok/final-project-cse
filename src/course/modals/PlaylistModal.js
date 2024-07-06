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

export default function PlaylistModal({ open, handleClose }) {
  const { id } = useParams();
  const [playlistForm, setPlaylistForm] = React.useState({
    playListId: "",
    courseId: id,
  });
  const [formErrors, setFormErrors] = React.useState({});
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      //   dispatch(createLecture({ courseId: id, lectureForm }));
      handleClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!playlistForm.playListId.trim()) errors.Name = "Link is required";
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
            New Play List
          </h2>

          <TextField
            id="outlined-basic-name"
            label="Link"
            variant="outlined"
            sx={{ width: "100%" }}
            required
            error={!!formErrors.playListId}
            helperText={formErrors.Name}
            onChange={(e) =>
              setPlaylistForm({ ...playlistForm, playListId: e.target.value })
            }
          />
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
