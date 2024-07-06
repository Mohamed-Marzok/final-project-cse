import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCourse } from "../redux/CoursesSlice";
import { getCourses } from "../redux/CoursesSlice";

export default function CreateCourse() {
  const [open, setOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    Name: "",
    Email: JSON.parse(localStorage.getItem("user"))?.Email,
    Description: "",
    photo: null,
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handelCreateBtnClick = () => {
    dispatch(createNewCourse(createForm));
    handleClose();
  };
  return (
    <>
      <AddBtn onClick={handleClickOpen}>+</AddBtn>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#471fade3",
          }}
        >
          Create Course
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ padding: "20px" }}
          >
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                onChange={(e) =>
                  setCreateForm({ ...createForm, Name: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={(e) =>
                  setCreateForm({ ...createForm, Description: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                type="file"
                variant="outlined"
                onChange={(e) =>
                  setCreateForm({ ...createForm, photo: e.target.files[0] })
                }
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelCreateBtnClick} color="success">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
const AddBtn = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background-color: #471fade3;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: bold;
  transition: all.5s;
  &:hover {
    transform: scale(1.08);
  }
  @media (max-width: 768px) {
    bottom: 30px;
    right: 30px;
  }
`;
