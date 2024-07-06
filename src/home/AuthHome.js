import styled from "styled-components";
import Courses from "./Courses";
import CreateCourse from "./CreateCourse";
import CourseEnrollment from "./CourseEnrollment";
export default function AuthHome() {
  const role = JSON.parse(localStorage.getItem("role"));
  return (
    <Content>
      <Courses />
      {role === "Instructor" ? <CreateCourse /> : <CourseEnrollment />}
    </Content>
  );
}
const Content = styled.div`
  position: relative;

  height: (100vh - 60px);
  padding: 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    margin: 0;
    padding: 10px;
    box-shadow: none;
  }
`;
