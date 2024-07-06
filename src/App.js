import { Container } from "@mui/material";
import "./App.css";
import Nav from "./main component/Nav";
import Home from "./main pages/Home";
import styled from "styled-components";
import ContactUs from "./main pages/ContactUs";
import AboutUs from "./main pages/AboutUs";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./main pages/MainPage";
import LogIn from "./main pages/LogIn";
import SignUp from "./main pages/SignUp";
import AuthHome from "./home/AuthHome";
import AuthPage from "./home/AuthPage";
import Course from "./course/Course";
import Exam from "./course/exam/Exam";
import ExamContainer from "./course/exam/ExamContainer";
import ErrorPathPage from "./main component/ErrorPathPage";
import { GradesCenter } from "./course/exam/GradesCenter";
import StudentModel from "./course/exam/StudentModel";
import AssGradCenter from "./course/assignment/AssGradCenter";
import YouTubePlaylist from "./course/YouTubePlaylist";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <Routes>
        {/* Routes under MainPage */}
        <Route path="/" element={<MainPage />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Routes under AuthPage */}

        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<Navigate to="/auth/home" />} />
          <Route path="home" element={<AuthHome />} />
          <Route path="course/:id" element={<Course />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
        </Route>

        {/* Routes under ExamContainer */}

        <Route path="/course/:id" element={<ExamContainer />}>
          <Route path="grade/:examId" element={<GradesCenter />} />
          <Route path="assgrade/:assId" element={<AssGradCenter />} />
          <Route path="model/:examId/:studentId" element={<StudentModel />} />
          <Route path="exam/:examId" element={<Exam />} />
          <Route path="home" element={<Navigate to="/auth/home" />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
        </Route>

        <Route path="*" element={<ErrorPathPage />} />
      </Routes>
    </div>
  );
}

export default App;
