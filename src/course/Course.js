import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAssignments, deleteAssignments } from "../redux/assignmentsSlice";
import { getExams, deleteExams } from "../redux/examsSlice";
import { getLectures, deleteLectures } from "../redux/lecturesSlice";
import { AssignmentCard, ExamCard, LectureCard } from "./CardsOnCourse";
import { PostCard } from "./PostCard";
import BtnAddCard from "./BtnAddCard";
import { deletePost, getPost } from "../redux/PostSlice";
import YouTubePlaylist from "./YouTubePlaylist";

export default function Course() {
  const [alignment, setAlignment] = useState("lecture");

  const { id } = useParams();
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.data);
  const assignments = useSelector((state) => state.assignments.data);
  const lectures = useSelector((state) => state.lectures.data);
  const posts = useSelector((state) => state.posts.data);
  const loading = useSelector(
    (state) =>
      state.assignments.loading ||
      state.exams.loading ||
      state.lectures.loading ||
      state.posts.loading
  );
  const role = JSON.parse(localStorage.getItem("role"));

  useEffect(() => {
    if (id) {
      dispatch(getExams(id));

      dispatch(getAssignments(id));

      dispatch(getLectures(id));

      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  const handleDeleteAssignment = (assignmentId) => {
    dispatch(deleteAssignments({ assignmentId, courseId: id }));
  };

  const handleDeleteExam = (examId) => {
    dispatch(deleteExams({ examId, courseId: id }));
  };

  const handleDeleteLecture = (lectureId) => {
    dispatch(deleteLectures({ lectureId, courseId: id }));
  };
  const handleDeletePost = (postId) => {
    dispatch(deletePost({ postId, courseId: id }));
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const renderList = useMemo(() => {
    switch (alignment) {
      case "exam":
        return exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            deleteFun={() => handleDeleteExam(exam.Id)}
          />
        ));
      case "assignment":
        return assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            deleteFun={() => handleDeleteAssignment(assignment.Id)}
          />
        ));
      case "lecture":
        return lectures.map((lecture) => (
          <LectureCard
            key={lecture.id}
            lecture={lecture}
            deleteFun={() => handleDeleteLecture(lecture.Id)}
          />
        ));
      case "post":
        return posts.map((post) => (
          <PostCard
            key={post.Id}
            post={post}
            deleteFun={() => handleDeletePost(post.Id)}
          />
        ));
      case "play":
        return <YouTubePlaylist />;
      case "code":
        return (
          <>
            <h2>
              course code : <h3 style={{ color: "red" }}>{id}</h3>
            </h2>
          </>
        );
      default:
        return "";
    }
  }, [alignment, exams, assignments, lectures, posts, id]);

  return (
    <Content>
      <BackIamge src="/shortlogo.png" />
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="content type"
      >
        <ToggleButton className="togBtn" value="lecture" aria-label="lecture">
          📚 <p>Lecture</p>
        </ToggleButton>
        <ToggleButton className="togBtn" value="exam" aria-label="exam">
          📝 <p>Exam</p>
        </ToggleButton>
        <ToggleButton
          className="togBtn"
          value="assignment"
          aria-label="assignment"
        >
          📄 <p>Assignment</p>
        </ToggleButton>
        <ToggleButton className="togBtn" value="post" aria-label="post">
          📭<p>Post</p>
        </ToggleButton>
        <ToggleButton className="togBtn" value="play" aria-label="play">
          🎬<p>Play List</p>
        </ToggleButton>
        <ToggleButton className="togBtn" value="code" aria-label="code">
          🔑<p>Code</p>
        </ToggleButton>
      </ToggleButtonGroup>
      {loading ? (
        <LoadingIndicator>
          <Spinner />
        </LoadingIndicator>
      ) : (
        <DataCard>{renderList}</DataCard>
      )}
      {role === "Instructor" && <BtnAddCard />}
    </Content>
  );
}

const Content = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px 80px 20px;
  position: relative;
  gap: 40px;
  @media (max-width: 768px) {
    height: calc(100vh - 100px);
    gap: 10px;
    .togBtn {
      p {
        display: none;
      }
    }
  }
`;

const DataCard = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  max-height: calc(100vh - 60px);
  overflow: auto;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #471fade3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
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
