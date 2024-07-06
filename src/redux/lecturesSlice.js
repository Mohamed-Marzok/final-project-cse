import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch lectures data
export const getLectures = createAsyncThunk(
  "lectures/getLectures",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/Lectures/GetCourseLectures${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching lectures:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete lectures
export const deleteLectures = createAsyncThunk(
  "lectures/deleteLectures",
  async ({ lectureId, courseId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `https://academix.runasp.net/api/Lectures/${lectureId}`
      );
      dispatch(getLectures(courseId));
    } catch (error) {
      console.error("Error deleting lectures:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create lectures
export const createLecture = createAsyncThunk(
  "lectures/createLecture",
  async ({ courseId, lectureForm }, { rejectWithValue, dispatch }) => {
    const lecture = new FormData();
    lecture.append("Name", lectureForm.Name);
    lecture.append("Description", lectureForm.Description);
    lecture.append("Link", lectureForm.Link);
    lecture.append("EndDate", lectureForm.EndDate);
    lecture.append("File", lectureForm.File);
    try {
      await axios.post(
        `https://academix.runasp.net/api/Lectures/${courseId}`,
        lecture
      );
      dispatch(getLectures(courseId));
    } catch (error) {
      console.error("Error creating lecture:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const lecturesSlice = createSlice({
  name: "lectures",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLectures.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLecture.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lecturesSlice.reducer;
