import React from "react";
import styled from "styled-components";
import ExamInfoTable from "./ExamInfoTable";
import ExamTimer from "./ExamTimer";

const ExamHeader = ({ examInfo, studentinfo }) => {
  const totalTime = parseInt(examInfo?.Time);
  return (
    <Content>
      {examInfo && !isNaN(totalTime) ? (
        <>
          <ExamInfoTable examInfo={examInfo} width={"70%"} />
          <ExamTimer totalTime={totalTime} studentinfo={studentinfo} />
        </>
      ) : (
        <p>Error: Exam information is incomplete or invalid.</p>
      )}
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export default ExamHeader;
