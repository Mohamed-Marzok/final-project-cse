import React, { useState, useEffect } from "react";
import { Button, Stack, Box, Modal, Pagination } from "@mui/material";
import Question from "../Question";
import { useDispatch, useSelector } from "react-redux";
import { createQuestions } from "../../redux/createQuestionsSlice";
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

const QuestionsModal = ({ open, handleClose, numOfQuestions }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const examId = useSelector((state) => state.exams.examId);
  const { id } = useParams();

  const createQuestionsState = useSelector((state) => state.createQuestions);

  useEffect(() => {
    const initialQuestions = Array.from(
      { length: numOfQuestions },
      (_, index) => ({
        id: index + 1,
        type: "",
        question: "",
        choices: [""],
        correctAnswer: [], // Initialize as an empty array for multiple answers
        points: "",
        explanation: "",
      })
    );
    setQuestions(initialQuestions);
  }, [numOfQuestions]);

  const handleChange = (e, questionId) => {
    const { name, value } = e.target;
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, [name]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionId, index, value) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const newChoices = [...question.choices];
        newChoices[index] = value;
        return { ...question, choices: newChoices };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSelectedAnswerChange = (questionId, index, checked) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        if (question.type === "mcq") {
          return {
            ...question,
            correctAnswer: checked ? String(index) : "",
          };
        } else if (question.type === "multiple choice") {
          let newCorrectAnswer = question.correctAnswer || ""; // Initialize as empty string if undefined or null

          if (checked) {
            // Add the index to the correctAnswer string
            newCorrectAnswer +=
              (newCorrectAnswer.length > 0 ? "/" : "") + String(index);
          } else {
            // Remove the index from the correctAnswer string
            newCorrectAnswer = newCorrectAnswer
              .split("/") // Split by "/"
              .filter((item) => item !== String(index)) // Filter out the index
              .join("/"); // Join back with "/"
          }

          // Sort the correctAnswer string in ascending order
          newCorrectAnswer = newCorrectAnswer
            .split("/") // Split by "/"
            .map((item) => parseInt(item)) // Convert each item to integer for correct sorting
            .sort((a, b) => a - b) // Sort in ascending order
            .join("/"); // Join back with "/"

          return {
            ...question,
            correctAnswer: newCorrectAnswer,
          };
        }
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          choices: [...question.choices, ""],
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleRemoveChoice = (questionId, index) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const newChoices = question.choices.filter((_, i) => i !== index);

        // Ensure correctAnswer is initialized and handled as string
        let newCorrectAnswer = question.correctAnswer || "";

        // Check if correctAnswer is not an empty string or already an array
        if (typeof newCorrectAnswer === "string") {
          // Split by "/" only if correctAnswer is not empty
          if (newCorrectAnswer !== "") {
            newCorrectAnswer = newCorrectAnswer
              .split("/") // Split by "/"
              .filter((item) => item !== String(index)) // Filter out the index
              .join("/"); // Join back with "/"
          }
        } else if (Array.isArray(newCorrectAnswer)) {
          // If correctAnswer is mistakenly set as an array, handle it correctly
          newCorrectAnswer = newCorrectAnswer
            .filter((item) => item !== index) // Filter out the index
            .join("/"); // Join back with "/"
        }

        return {
          ...question,
          choices: newChoices,
          correctAnswer: newCorrectAnswer,
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    for (const question of questions) {
      if (!question.question || !question.points) {
        return false;
      }
    }
    return true;
  };

  const handleSubmitClick = () => {
    if (!questions || questions.length === 0) {
      console.error("Questions array is empty or undefined.");
      setErrorMessage("Questions array is empty or undefined.");
      return;
    }
    if (!validateQuestions()) {
      console.error("Please fill all required fields.");
      setErrorMessage("Please fill all required fields.");
      return;
    }
    dispatch(createQuestions({ examId, courseId: id, questions }));
    console.log(examId, id, questions);
    handleClose();
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {questions.length > 0 && questions[currentPage - 1] ? (
          <Question
            questionForm={questions[currentPage - 1]}
            handleChange={(e) => handleChange(e, questions[currentPage - 1].id)}
            handleChoiceChange={(index, value) =>
              handleChoiceChange(questions[currentPage - 1].id, index, value)
            }
            handleSelectedAnswerChange={(index, checked) =>
              handleSelectedAnswerChange(
                questions[currentPage - 1].id,
                index,
                checked
              )
            }
            handleAddChoice={() =>
              handleAddChoice(questions[currentPage - 1].id)
            }
            handleRemoveChoice={(index) =>
              handleRemoveChoice(questions[currentPage - 1].id, index)
            }
          />
        ) : null}
        <Stack direction="row" justifyContent="center">
          <Pagination
            count={numOfQuestions}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
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
          <Button variant="contained" onClick={handleSubmitClick}>
            Submit
          </Button>
        </Stack>
        {errorMessage && (
          <Box mt={2} color="error.main">
            {errorMessage}
          </Box>
        )}
        {createQuestionsState && createQuestionsState.loading && (
          <p>Loading...</p>
        )}
        {createQuestionsState && createQuestionsState.error && (
          <p>Error: {createQuestionsState.error}</p>
        )}
        {createQuestionsState && createQuestionsState.success && (
          <p>Questions created successfully!</p>
        )}
      </Box>
    </Modal>
  );
};

export default QuestionsModal;
