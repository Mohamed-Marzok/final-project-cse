import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteCourse, getCourses } from "../redux/CoursesSlice";
import { Card, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Courses() {
  const [userEmail, setUserEmail] = useState("");
  const courses = useSelector((state) => state.courses.courses);
  const isLoading = useSelector((state) => state.courses.loading);
  const userFromSlice = useSelector((state) => state.login.user);
  const role = JSON.parse(localStorage.getItem("role"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.Email) {
        setUserEmail(user.Email);
      } else {
        console.warn("User object is malformed or missing Email property.");
      }
    } else {
      console.warn("No user found in localStorage.");
    }
  }, [userFromSlice]);
  console.log(userEmail);
  useEffect(() => {
    if (userEmail) {
      dispatch(getCourses(userEmail));
    }
  }, [userEmail, dispatch]);
  const handleCourseClick = (courseID) => {
    navigate(`/auth/course/${courseID}`);
  };
  const handleDeleteClick = (e, courseID) => {
    e.stopPropagation();
    dispatch(deleteCourse(courseID));
  };
  const coursesList = useMemo(() => {
    console.log(courses);
    return courses?.map((course) => (
      <CourseCard
        key={course.Course.Id}
        onClick={() => handleCourseClick(course.Course.Id)}
      >
        <Image
          src={`data:image/png;base64,${course.Course.File}`}
          alt={course.Course.CourseName}
        />
        <Footer>{course.Course.CourseName}</Footer>
        {role === "Instructor" ? (
          <IconButton
            aria-label="delete"
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 1,
            }}
            color="error"
            size="small"
            onClick={(e) => handleDeleteClick(e, course.Course.Id)}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          ""
        )}
      </CourseCard>
    ));
  }, [courses]);

  return (
    <Content>
      <BackIamge src="/shortlogo.png" />

      {isLoading ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        coursesList
      )}
    </Content>
  );
}

const Content = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  gap: 20px;
  @media (max-width: 768px) {
    height: calc(100vh - 110px);
    overflow: auto;
    gap: 10px;
    z-index: -10000;
  }
`;

const CourseCard = styled(Card)`
  width: 200px;
  height: 200px;
  margin: 10px;
  padding: 8px;
  transition: all 1s;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 70%;
  height: 150px;
  object-fit: cover;
`;

const Footer = styled.h3`
  padding: 0px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #471fade3;
  flex-grow: 1;
`;
const BackIamge = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45%;
  /* height: 50%; */
  z-index: -100000;
  opacity: 0.5;
`;
