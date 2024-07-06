import React from "react";
import {
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Question({
  questionForm,
  handleChange,
  handleChoiceChange,
  handleSelectedAnswerChange,
  handleAddChoice,
  handleRemoveChoice,
}) {
  return (
    <>
      <h2
        id="modal-modal-title"
        style={{ marginBottom: "20px", color: "#1f8c88" }}
      >
        Question {questionForm.id}
      </h2>
      <Stack spacing={2} sx={{ marginBottom: "20px" }}>
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type-select"
            label="Type"
            name="type"
            value={questionForm.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="mcq">MCQ</MenuItem>
            <MenuItem value="multiple choice">Multiple Choice</MenuItem>
            <MenuItem value="written">Written</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Question"
          variant="outlined"
          fullWidth
          name="question"
          value={questionForm.question}
          onChange={handleChange}
          required
        />
        {(questionForm.type === "mcq" ||
          questionForm.type === "multiple choice") && (
          <div>
            <h4>Choices</h4>
            {questionForm.choices.map((choice, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <TextField
                  id={`choice-${index}`}
                  label={`Choice ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  required
                />
                {questionForm.type === "mcq" ? (
                  <Radio
                    checked={questionForm.correctAnswer === String(index)}
                    onChange={(e) =>
                      handleSelectedAnswerChange(index, e.target.checked)
                    }
                    required
                  />
                ) : (
                  <Checkbox
                    checked={questionForm.correctAnswer.includes(String(index))}
                    onChange={(e) =>
                      handleSelectedAnswerChange(index, e.target.checked)
                    }
                    required
                  />
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveChoice(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Button variant="contained" onClick={handleAddChoice}>
              Add Choice
            </Button>
          </div>
        )}
        <TextField
          id="outlined-basic"
          label="Points"
          type="number"
          variant="outlined"
          fullWidth
          name="points"
          value={questionForm.points}
          inputProps={{ min: 0 }}
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Explanation"
          variant="outlined"
          fullWidth
          name="explanation"
          value={questionForm.explanation}
          onChange={handleChange}
          required
        />
      </Stack>
    </>
  );
}
