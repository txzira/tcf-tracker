import { GetServerSideProps } from "next";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FloatingInput, FloatingInputRef } from "../../components/Form";
import { Data } from "../../types/response";
import fs from "fs";
import prisma from "../../lib/prisma";

export const getStaticProps: GetServerSideProps = async ({ req }) => {
  const items = await prisma.item.findMany();

  console.log(items);
  return {
    props: { items },
  };
};

const Items = ({ items }: { items: Item[] }) => {
  const name = useRef<HTMLInputElement>(null);
  const kMarks = useRef<HTMLInputElement>(null);
  const factionPoints = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const createItem = async () => {
    const getRes = await fetch("/api/admin/item/create-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.current?.value, kMarks: kMarks.current?.value, factionPoints: factionPoints.current?.value }),
    });
    const res: Data = await getRes.json();

    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
      router.reload();
    }
  };

  return (
    <div>
      <h1>Item CRUD</h1>
      <div id="create" className="flex flex-row items-center gap-x-2">
        <FloatingInputRef name="name" id="name" ref={name} label="Name" />
        <FloatingInputRef name="kMarks" id="kMarks" ref={kMarks} label="kMarks" />
        <FloatingInputRef name="factionPoints" id="factionPoints" ref={factionPoints} label="Faction Points" />
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

export default Items;
