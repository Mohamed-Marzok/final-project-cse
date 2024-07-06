import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SubmissionExam } from "../../redux/examSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ExamTimer = ({ totalTime, studentinfo }) => {
  const initialSeconds = totalTime * 60;
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(initialSeconds);
  const [minutes, setMinutes] = useState(totalTime);
  const [seconds, setSeconds] = useState(initialSeconds % 60);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => {
        // Decrement current time by 1 second
        const newTime = prevTime - 1;

        // Calculate new minutes and seconds
        const newMinutes = Math.floor(newTime / 60);
        const newSeconds = newTime % 60;

        // Update state for minutes and seconds
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        // Check if timer should stop
        if (newTime <= 0) {
          clearInterval(timer);
          dispatch(SubmissionExam(studentinfo));
          navigate(`/auth/course/${id}`);
        }

        return newTime;
      });
    }, 1000); // Update every second (1000 milliseconds)

    return () => clearInterval(timer); // Clean up timer on component unmount
  }, []); // useEffect runs only once on component mount

  // Calculate percentage of remaining time
  const percentageRemaining = (currentTime / (totalTime * 60)) * 100;

  // Calculate dash offset to animate the progress circles
  const minutesDashOffset = ((100 - (minutes / totalTime) * 100) / 100) * 314;
  const secondsDashOffset = ((60 - seconds) / 60) * 314; // Correct calculation for seconds

  return (
    <Time>
      <div className="box">
        {/* Minutes Circle */}
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="backgroundCircle"
            style={{ stroke: "#ddd" }}
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className="hrprogress"
            style={{
              strokeDasharray: "314",
              strokeDashoffset: minutesDashOffset,
              stroke: "#471fade3",
            }}
          />
        </svg>
        <div className="text">
          <h2>{minutes}</h2>
          <p>min</p>
        </div>
      </div>
      <div className="box">
        {/* Seconds Circle */}
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="backgroundCircle"
            style={{ stroke: "#ddd" }}
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className="hrprogress"
            style={{
              strokeDasharray: "314",
              strokeDashoffset: secondsDashOffset,
              stroke: "#f13c3c",
            }}
          />
        </svg>
        <div className="text">
          <h2 style={{ color: "#f13c3c" }}>{seconds}</h2>
          <p style={{ color: "#f13c3c" }}>sec</p>
        </div>
      </div>
    </Time>
  );
};

const Time = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
  }
  .box {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .box .text {
    text-align: center;
  }

  .box .text h2 {
    color: #471fade3;
    font-weight: bold;
    font-size: 1.8em;
    margin: 0;
  }

  .box p {
    color: #471fade3;
    font-size: 1.2em;
    margin: 0;
  }

  .box svg {
    position: absolute;
    transform: rotate(-90deg); /* Rotate the circle to start from the top */
  }

  .box svg circle {
    stroke-width: 8; /* Increased stroke width for better visibility */
    fill: transparent; /* Ensure fill is transparent */
  }

  .backgroundCircle {
    stroke-dasharray: 314;
    stroke-dashoffset: 0;
  }
`;

export default ExamTimer;
