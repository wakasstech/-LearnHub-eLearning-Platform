import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import "./CustomLoader.css";

export default function LoadingScreen() {
  const [open] = React.useState(true);
  /*  const handleClose = () => {
    setOpen(false);
  }; */

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          opacity: 1,
        }}
        open={open}
        //onClick={handleClose}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div class="customLoader"></div>
          <p
            className="text-center"
            style={{ fontWeight: "bold", color: "#ebfcff", marginTop: 10 }}
          >
            Please hold on. It may take a few seconds...
          </p>
        </div>
      </Backdrop>
    </div>
  );
}
