import React from "react";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

export default function ModalCard({ title, content, color, idx }) {
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        style={{ padding: 0, border: 0 }}
        data-bs-toggle="modal"
        data-bs-target={`#modal${idx}`}
      >
        <Paper
          elevation={8}
          sx={{ backgroundColor: color }}
          className="article-paper"
        >
          <Typography
            variant="body1"
            style={{
              fontSize: "1.3rem",
              fontFamily: 'Georgia, "Times New Roman", Times, serif',
              textDecoration: "none",
              color: "black",
            }}
          >
            {title}
          </Typography>
        </Paper>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={`modal${idx}`}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
