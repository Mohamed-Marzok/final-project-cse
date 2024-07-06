import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getExams } from "./examsSlice"; // Assuming this action exists to fetch exams

// Thunk to create questions for an exam
export const createQuestions = createAsyncThunk(
  "exams/createQuestions",
  async ({ examId, courseId, questions }, { dispatch, rejectWithValue }) => {
    try {
      const formattedQuestions = questions.map((question) => ({
        type: question.type,
        question: question.question,
        choices: question.choices,

        correctAnswer: `${
          question.type === "written"
            ? question.correctAnswer.join()
            : question.correctAnswer
        }`,
        points: parseInt(question.points),
        explanation: question.explanation,
      }));
      console.log(formattedQuestions);
      const response = await axios.post(
        `https://academix.runasp.net/api/Questions/${examId}`,
        formattedQuestions
      );

      dispatch(getExams(courseId));

      return response.data;
    } catch (error) {
      console.error("Error creating questions:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const createQuestionsSlice = createSlice({
  name: "createQuestions",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createQuestions.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default createQuestionsSlice.reducer;
