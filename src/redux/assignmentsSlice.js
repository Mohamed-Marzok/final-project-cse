import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch assignments data
export const getAssignments = createAsyncThunk(
  "assignments/getAssignments",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/Asignments/GetCourseAssignments${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching assignments:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete assignments
export const deleteAssignments = createAsyncThunk(
  "assignments/deleteAssignments",
  async ({ assignmentId, courseId }, { rejectWithValue, dispatch }) => {
    try {
      console.log(assignmentId);
      await axios.delete(
        `https://academix.runasp.net/api/Asignments/${assignmentId}`
      );
      dispatch(getAssignments(courseId));
    } catch (error) {
      console.error("Error deleting assignments:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create assignments
export const createAssignment = createAsyncThunk(
  "assignments/createAssignment",
  async ({ courseId, assignmentForm }, { rejectWithValue, dispatch }) => {
    const assignment = new FormData();
    assignment.append("Tittle", assignmentForm.Title);
    assignment.append("Description", assignmentForm.Description);
    assignment.append("Grade", assignmentForm.Grade);
    assignment.append("EndDate", assignmentForm.EndDate);
    assignment.append("File", assignmentForm.File);
    try {
      await axios.post(
        `https://academix.runasp.net/api/Asignments/CreateAssignment${courseId}`,
        assignment
      );
      dispatch(getAssignments(courseId));
    } catch (error) {
      console.error("Error creating assignment:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssignments.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default assignmentsSlice.reducer;
