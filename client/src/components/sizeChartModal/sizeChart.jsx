import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import size from "../../assets/images/sizeChart.png";
import measure from "../../assets/images/measure.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen}>SIZE CHART</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "12px",
              fontSize: "1.4rem",
              backgroundColor: "black",
              color: "white",
              padding: "0px 10px 0px 10px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            X
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "2rem", textAlign: "center" }}>Size Chart</p>
            <img src={size} alt="sizeChart" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "2rem", textAlign: "center" }}>
              How to Measure
            </p>
            <img src={measure} alt="measurement" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
