import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch user courses
export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (userEmail, { rejectWithValue }) => {
    try {
      console.log(userEmail);
      const response = await axios.get(
        "https://academix.runasp.net/api/Courses/GetUserCourses",
        {
          headers: { usermail: userEmail },
        }
      );
      const courses = response.data.usercourse;
      console.log(courses);
      return courses;
    } catch (error) {
      console.error("Error fetching user courses:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create a new course
export const createNewCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseForm, { rejectWithValue, dispatch }) => {
    try {
      const course = new FormData();
      course.append("Name", courseForm.Name);
      course.append("Email", courseForm.Email);
      course.append("Description", courseForm.Description);
      course.append("photo", courseForm.photo);
      console.log(course);
      await axios.post(
        "https://academix.runasp.net/api/Courses/CreateCourse",
        course
      );
      // After creating a new course, fetch the updated list of courses
      dispatch(getCourses(courseForm.Email));
      return courseForm.Email;
    } catch (error) {
      console.error("Error creating new course:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete course
export const deleteCourse = createAsyncThunk(
  "lectures/deleteCourse ",
  async (courseId, { rejectWithValue, dispatch }) => {
    console.log(courseId);
    try {
      await axios.delete(`https://academix.runasp.net/api/Courses/${courseId}`);
      dispatch(getCourses(courseId));
    } catch (error) {
      console.error("Error deleting lectures:", error);
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to enrollment a new course
export const enrollmentNewCourse = createAsyncThunk(
  "courses/enrollmentNewCourse ",
  async (enrollmentForm, { rejectWithValue, dispatch }) => {
    try {
      console.log(enrollmentForm);
      await axios.post(
        "https://academix.runasp.net/api/Enrollments",
        enrollmentForm
      );
      dispatch(getCourses(enrollmentForm.email));
    } catch (error) {
      console.error("Error creating new course:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the courses slice
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCourse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coursesSlice.reducer;
