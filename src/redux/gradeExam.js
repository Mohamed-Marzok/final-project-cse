import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch ExamGrades data
export const getExamGrades = createAsyncThunk(
  "exams/getExamGrades",
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/GradesCenter/GetExaamGrades/${examId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to fetch student Model data
export const getStudentModel = createAsyncThunk(
  "exams/getStudentModel",
  async ({ examId, studentId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/GradesCenter/GetStudentExam/${examId}/${studentId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to fetch student Model data
export const updateStudentGrad = createAsyncThunk(
  "exams/updateStudentGrad ",
  async (dataForm, { rejectWithValue }) => {
    console.log(dataForm);
    try {
      await axios.put(
        `https://academix.runasp.net/api/Submissions/manual-correction`,
        dataForm
      );
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const examGradeSlice = createSlice({
  name: "examGrade ",
  initialState: {
    data: [],
    model: {},
    examId: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExamGrades.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getStudentModel.fulfilled, (state, action) => {
        state.model = action.payload;
      });
  },
});

export default examGradeSlice.reducer;
