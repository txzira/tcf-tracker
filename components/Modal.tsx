import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import { Faction, Quest } from "@prisma/client";
import { trpc } from "../utils/trpc";
import toast from "react-hot-toast";
import router from "next/router";

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
  const updateFactionTrpc = trpc.updateFaction.useMutation();

  const updateFaction = async (id: number | undefined) => {
    try {
      if (id) {
        await updateFactionTrpc.mutateAsync({ name: factionName, factionId: id });
      }
    } catch (err: any) {
      toast.error(err.message);
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
    if (updateFactionTrpc.isSuccess) {
      toast.success(`Faction "${faction?.name}" updated to, ${updateFactionTrpc.data.message}`);
      router.reload();
    }
  }, [updateFactionTrpc]);

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

              <div className="modal-body">
                <h1>{faction?.name}</h1>
                <label htmlFor="factionName">Faction Name: </label>
                <input id="facitonName" value={factionName} type="text" onChange={(event) => setFactionName(event.target.value)} />
                <button type="button" onClick={() => updateFaction(faction?.id)}>
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
      document.getElementById("__next")!
    );
  } else {
    return null;
  }
};

export const QuestModal = ({
  show,
  setShow,
  quest,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  quest: Quest | undefined;
}) => {
  const [questName, setQuestName] = useState<string>("");
  const updateQuestTrpc = trpc.updateQuest.useMutation();

  const updateQuest = async (id: number | undefined) => {
    try {
      if (id) {
        await updateQuestTrpc.mutateAsync({ name: questName, questId: id });
      }
    } catch (err: any) {
      toast.error(err.message);
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
    if (updateQuestTrpc.isSuccess) {
      toast.success(`Quest "${quest?.name}" updated to, ${updateQuestTrpc.data.message}`);
      router.reload();
    }
  }, [updateQuestTrpc]);

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

              <div className="modal-body">
                <h1>{quest?.name}</h1>
                <label htmlFor="questName">Quest Name: </label>
                <input id="questName" value={questName} type="text" onChange={(event) => setQuestName(event.target.value)} />
                <button type="button" onClick={() => updateQuest(quest?.id)}>
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
      document.getElementById("__next")!
    );
  } else {
    return null;
  }
};
