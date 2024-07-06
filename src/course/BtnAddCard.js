import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LectureModal from "./modals/LectureModal";
import ExamModal from "./modals/ExamModal";
import AssignmentModal from "./modals/AssignmentModal";
import PostModal from "./modals/PostModal";
import PlaylistModal from "./modals/PlaylistModal";
const actions = [
  { icon: "📚", name: "Lecture", component: LectureModal },
  { icon: "📝", name: "Exam", component: ExamModal },
  { icon: "📄", name: "Assignment", component: AssignmentModal },
  { icon: "📭", name: "Post", component: PostModal },
  { icon: "🎬", name: "Post", component: PlaylistModal },
];
export default function BtnAddCard() {
  const [openModal, setOpenModal] = React.useState(false);
  const [ModalComponent, setModalComponent] = React.useState(null);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleBtnClick = (Component) => {
    setModalComponent(() => Component);
    handleOpen();
  };

  return (
    <>
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 20, right: 20 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleBtnClick(action.component)}
            />
          ))}
        </SpeedDial>
      </Box>
      {ModalComponent && (
        <ModalComponent open={openModal} handleClose={handleClose} />
      )}
    </>
  );
}
