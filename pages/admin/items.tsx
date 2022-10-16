import { GetServerSideProps } from "next";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FloatingInput } from "../../components/Form";

export const getStaticProps: GetServerSideProps = async ({ req }) => {
  const items = await prisma.item.findMany();
  await prisma.$disconnect();

  console.log(items);
  return {
    props: { items },
  };
};

const Item = ({ items }: { items: Item[] }) => {
  const [name, setName] = useState("");
  const [kMarks, setKmarks] = useState("");
  const [factionPoints, setFactionPoints] = useState("");
  const router = useRouter();

  const createItem = async () => {
    fetch("/api/admin/item/create-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, kMarks, factionPoints }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status.toString().startsWith("2")) {
          toast.success(response.message);
        }
      });
    console.log(router.asPath);
    router.replace(router.asPath);
  };
  console.log(items);
  return (
    <div>
      <h1>Item CRUD</h1>
      <div id="create" className="flex flex-row items-center gap-x-2">
        <FloatingInput name="name" id="name" value={name} onChange={setName} label="Name" />
        <FloatingInput name="kMarks" id="kMarks" value={kMarks} onChange={setKmarks} label="kMarks" />
        <FloatingInput name="factionPoints" id="factionPoints" value={factionPoints} onChange={setFactionPoints} label="Faction Points" />
        <button type="button" className="px-2 border rounded-lg bg-green-500 text-white border-black" onClick={createItem}>
          Add
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>kMarks</th>
              <th>Faction Points</th>
            </tr>
          </thead>
          {items && (
            <tbody>
              {items.map((item) => (
                <tr className="text-center" key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.kMarks}</td>
                  <td>{item.factionPoints}</td>
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

export default Item;
