import { QuestRequirement } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { FloatingInputRef } from "../../components/Form";
import prisma from "../../lib/prisma";
import { Data } from "../../types/response";

export const getStaticProps: GetServerSideProps = async ({ req }) => {
  const questRequirements = await prisma.questRequirement.findMany();

  console.log(questRequirements);
  return {
    props: { questRequirements },
  };
};

const QuestRequirements = ({ questRequirements }: { questRequirements: QuestRequirement[] }) => {
  const quantity = useRef<HTMLInputElement>(null);
  const questId = useRef<HTMLInputElement>(null);
  const itemId = useRef<HTMLInputElement>(null);
  const task = useRef<HTMLInputElement>(null);

  const createQuestRequirement = async (event: any) => {
    event.preventDefault();
    const getRes = await fetch("/api/admin/quest/create-quest-requirement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task.current?.value,
        itemId: itemId.current?.value,
        questId: questId.current?.value,
        quantity: quantity.current?.value,
      }),
    });
    const res: Data = await getRes.json();
    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
    }
  };
  return (
    <div>
      <form>
        <h1>Quest Requirement</h1>
        <div className="flex flex-row items-center gap-x-2">
          <FloatingInputRef name="questId" id="questId" ref={questId} label="Quest Id" />
          <FloatingInputRef name="itemId" id="itemId" ref={itemId} label="Item Id" />
          <FloatingInputRef name="task" id="task" ref={task} label="Task" />
          <FloatingInputRef name="quantity" id="quantity" ref={quantity} label="Quantity" />
          <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createQuestRequirement}>
            Add
          </button>
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>kMarks</th>
              <th>Faction Points</th>
            </tr>
          </thead>
          {questRequirements && (
            <tbody>
              {questRequirements.map((questRequirement) => (
                <tr className="text-center" key={questRequirement.id}>
                  {/* <td>{item.name}</td>
                  <td>{item.kMarks}</td>
                  <td>{item.factionPoints}</td> */}
                </tr>
              ))}
              <tr></tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default QuestRequirements;
