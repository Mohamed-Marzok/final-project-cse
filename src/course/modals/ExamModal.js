import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createExam } from "../../redux/examsSlice";
import { useParams } from "react-router-dom";
import QuestionsModal from "./QuestionsModal";

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

const initialExamForm = {
  tittle: "",
  describtion: "",
  instructions: "",
  time: "",
  numOfQuestions: "",
  endDate: "",
};

const ExamModal = ({ open, handleClose }) => {
  const [examForm, setExamForm] = useState(initialExamForm);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [questionsModalOpen, setQuestionsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Set initial grade to 10 when the component mounts
    setExamForm((prevForm) => ({
      ...prevForm,
      grades: "10",
    }));
  }, []);

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        await dispatch(createExam({ courseId: id, examForm }));
        setQuestionsModalOpen(true);
        handleClose();
      } catch (error) {
        console.error("Failed to create exam:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!examForm.tittle) errors.tittle = "Title is required";
    if (!examForm.describtion) errors.describtion = "Description is required";
    if (!examForm.instructions)
      errors.instructions = "Instructions are required";
    if (!examForm.time) errors.time = "Time is required";
    if (!examForm.numOfQuestions)
      errors.numOfQuestions = "Number of Questions is required";
    if (!examForm.endDate) errors.endDate = "End date is required";
    return errors;
  };

  const handleQuestionsModalClose = () => {
    setQuestionsModalOpen(false);
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
            style={{ marginBottom: "20px", color: "#1f4fa3" }}
          >
            New Exam
          </h2>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required
              error={!!formErrors.tittle}
              helperText={formErrors.tittle}
              value={examForm.tittle}
              onChange={(e) =>
                setExamForm({ ...examForm, tittle: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required
              error={!!formErrors.describtion}
              helperText={formErrors.describtion}
              value={examForm.describtion}
              onChange={(e) =>
                setExamForm({ ...examForm, describtion: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Instructions"
              variant="outlined"
              required
              error={!!formErrors.instructions}
              helperText={formErrors.instructions}
              value={examForm.instructions}
              onChange={(e) =>
                setExamForm({ ...examForm, instructions: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Time (minutes)"
              type="number"
              variant="outlined"
              required
              error={!!formErrors.time}
              helperText={formErrors.time}
              inputProps={{ min: 0 }}
              value={examForm.time}
              onChange={(e) =>
                setExamForm({ ...examForm, time: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              type="date"
              variant="outlined"
              required
              error={!!formErrors.endDate}
              helperText={formErrors.endDate}
              value={examForm.endDate}
              onChange={(e) =>
                setExamForm({ ...examForm, endDate: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Number Of Questions"
              type="number"
              variant="outlined"
              required
              error={!!formErrors.numOfQuestions}
              helperText={formErrors.numOfQuestions}
              value={examForm.numOfQuestions}
              onChange={(e) =>
                setExamForm({ ...examForm, numOfQuestions: e.target.value })
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
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </Stack>
        </Box>
      </Modal>

      {questionsModalOpen && (
        <QuestionsModal
          open={questionsModalOpen}
          handleClose={handleQuestionsModalClose}
          numOfQuestions={examForm.numOfQuestions}
        />
      )}
    </div>
  );
};

export default ExamModal;
