import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";

const QuestModal = ({ show, setShow }: { show: boolean; setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {
  function closeOrderDetails() {
    setShow(false);
  }
  function closeOnEscKeyDown(e: any) {
    if ((e.charCode || e.keyCode) === 27) {
      closeOrderDetails();
    }
  }
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscKeyDown);
    };
  }, []);
  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
        <div className="modal" onClick={() => closeOrderDetails()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="modal-header">
                <div className="flex justify-between items-center"></div>
              </div>

              <div className="modal-body"></div>
              <div className="modal-footer">
                <button className="button" onClick={() => closeOrderDetails()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>,
      document.getElementById("__next")!
    );
  } else {
    return null;
  }
};

export default QuestModal;
