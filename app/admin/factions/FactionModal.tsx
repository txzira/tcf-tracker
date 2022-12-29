"use client";
import { Faction } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { CSSTransition } from "react-transition-group";

export const FactionModal = ({
  show,
  setShow,
  faction,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  faction: Faction | undefined;
}) => {
  const [factionName, setFactionName] = useState<string>("");
  const router = useRouter();

  const updateFaction = async (factionId: number | undefined, oldFactionName: string | undefined, factionName: string) => {
    try {
      const response = await fetch("/api/admin/faction/crud", {
        method: "POST",
        body: JSON.stringify({ action: "update", factionId, oldFactionName, factionName }),
      });
      const json = await response.json();
      toast.success(json.message);
      closeOrderDetails();
      setFactionName("");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
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
        <div className="modal text-black" onClick={() => closeOrderDetails()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="modal-header">
                <div className="flex justify-between items-center"></div>
              </div>
              <div className="modal-body">
                <h1>{faction?.name}</h1>
                <label htmlFor="factionName">Faction Name: </label>
                <input id="facitonName" value={factionName} type="text" onChange={(event) => setFactionName(event.target.value)} />
                <button
                  className="rounded-lg border bg-green-500 px-2 border-black"
                  type="button"
                  onClick={() => updateFaction(faction?.id, faction?.name, factionName)}
                >
                  Update
                </button>
              </div>
              <div className="modal-footer">
                <button className="button" onClick={() => closeOrderDetails()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>,
      document.getElementById("main")!
    );
  } else {
    return null;
  }
};
