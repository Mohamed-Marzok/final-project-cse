import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch exams data
export const getExams = createAsyncThunk(
  "exams/getExams",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/Exams/GetCourseExams/${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete exams
export const deleteExams = createAsyncThunk(
  "exams/deleteExams",
  async ({ examId, courseId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `https://academix.runasp.net/api/Exams/DeleteExam/${examId}`
      );
      dispatch(getExams(courseId));
    } catch (error) {
      console.error("Error deleting exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create exam
export const createExam = createAsyncThunk(
  "exams/createExam",
  async ({ courseId, examForm }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `https://academix.runasp.net/api/Exams/CreateExam/${courseId}`,
        examForm
      );
      console.log(response);
      return response.data.exam.Id;
    } catch (error) {
      console.error("Error creating exam:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const examsSlice = createSlice({
  name: "exams",
  initialState: {
    data: [],
    examId: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExams.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.examId = action.payload;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examsSlice.reducer;
