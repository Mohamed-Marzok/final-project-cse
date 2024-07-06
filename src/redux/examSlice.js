import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch exam data
export const getExam = createAsyncThunk(
  "exams/getExam",
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/Exams/GetExam/${examId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to Submissions exam data
export const SubmissionExam = createAsyncThunk(
  "exams/SubmissionExam",
  async (studentAns, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://academix.runasp.net/api/Submissions`,
        studentAns
      );
      console.log(response);
      // return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const examsSlice = createSlice({
  name: "exam",
  initialState: {
    exam: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload;
      })
      .addCase(getExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examsSlice.reducer;
