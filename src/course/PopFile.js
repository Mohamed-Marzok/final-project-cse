import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const PopFile = ({ open, onClose, selectedFile }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <iframe
          src={selectedFile}
          width="100%"
          height="100%"
          title="PDF File"
          style={{ border: "none", zIndex: "10000" }}
        ></iframe>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "hidden",
  zIndex: 1000,
};

export default PopFile;
