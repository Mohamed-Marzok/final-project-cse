import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch post data
export const getPost = createAsyncThunk(
  "Posts/getPost",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://academix.runasp.net/api/Discussions/GetCoursePosts${courseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete post
export const deletePost = createAsyncThunk(
  "Posts/deletePost",
  async ({ postId, courseId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `https://academix.runasp.net/api/Discussions/${postId}`
      );
      dispatch(getPost(courseId));
    } catch (error) {
      console.error("Error deleting post:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to create Post
export const createPost = createAsyncThunk(
  "Posts/createPost",
  async ({ courseId, postForm }, { rejectWithValue, dispatch }) => {
    console.log(postForm);
    const formData = new FormData();
    formData.append("UserEmail", postForm.UserEmail);
    formData.append("Tittle", postForm.Tittle); // Ensure this matches API expectations
    formData.append("Content", postForm.Content);
    formData.append("File", postForm.File);

    try {
      const response = await axios.post(
        `https://academix.runasp.net/api/Discussions/${courseId}`,
        formData
      );

      dispatch(getPost(courseId));

      return response.data; // Return data if needed in the future
    } catch (error) {
      console.error("Error creating post:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
