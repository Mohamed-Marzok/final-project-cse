import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch assginment Grades data
export const getAssignmentGrades = createAsyncThunk(
  "assignment/getAssignmentGrades",
  async (assId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/SubmissionAssignments/GetAssignmentSubmissions${assId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exams:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to uploadAssginmentStudent data
export const uploadAssginmentStudent = createAsyncThunk(
  "Assginment/uploadAssginmentStudent",
  async (formAss, { rejectWithValue }) => {
    console.log(formAss);
    try {
      const formData = new FormData();
      formData.append("UserEmail", formAss.UserEmail);
      formData.append("File", formAss.File);
      formData.append("AssignmentId", formAss.AssignmentId);

      const response = await axios.post(
        `https://academix.runasp.net/api/SubmissionAssignments/AddAssignmentSubmission`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading assignment:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to update student grade
export const updateStudentGrad = createAsyncThunk(
  "assignment/updateStudentGrad",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("AssignmentId", formData.AssignmentId);
      data.append("UserId", formData.UserId);
      data.append("Grade", formData.Grade);

      console.log("Form Data: ", data); // Debugging

      const response = await axios.put(
        `https://academix.runasp.net/api/SubmissionAssignments/AdddAssignmentGrade`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response: ", response); // Debugging
      dispatch(getAssignmentGrades(formData.AssignmentId));
    } catch (error) {
      console.error("Error updating grade: ", error.response || error);
      return rejectWithValue(error.response.data);
    }
  }
);
const assignmentGradeSlice = createSlice({
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
    builder.addCase(getAssignmentGrades.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default assignmentGradeSlice.reducer;
