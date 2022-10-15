import React, { useState } from "react";
import toast from "react-hot-toast";
import { FloatingInput } from "../../Form";

const QuestRequirement = () => {
  const [quantity, setQuantity] = useState("");
  const [questId, setQuestId] = useState("");
  const [itemId, setItemId] = useState("");
  const [task, setTask] = useState("");

  const createQuestRequirement = async () => {
    fetch("/api/admin/quest/create-quest-requirement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, itemId, questId, quantity }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status.toString().startsWith("2")) {
          toast.success(response.message);
        }
      });
  };
  return (
    <form>
      <h1>Quest Requirement</h1>
      <div className="flex flex-row items-center gap-x-2">
        <FloatingInput name="questId" id="questId" value={questId} onChange={setQuestId} label="Quest Id" />
        <FloatingInput name="itemId" id="itemId" value={itemId} onChange={setItemId} label="Item Id" />
        <FloatingInput name="task" id="task" value={task} onChange={setTask} label="Task" />
        <FloatingInput name="quantity" id="quantity" value={quantity} onChange={setQuantity} label="Quantity" />
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createQuestRequirement}>
          Add
        </button>
      </div>
    </form>
  );
};

export default QuestRequirement;
