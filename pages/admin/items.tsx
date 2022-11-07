import { GetServerSideProps } from "next";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState, useRef, FormEvent } from "react";
import toast from "react-hot-toast";
import { FloatingInput, FloatingInputRef } from "../../components/Form";
import { Data } from "../../types/response";
import fs from "fs";
import prisma from "../../lib/prisma";
import Image from "next/image";
import { getToken } from "next-auth/jwt";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
  if (token?.role === "admin") {
    const items = await prisma.item.findMany();

    console.log(items);
    return {
      props: { items },
    };
  } else {
    return {
      props: {},
    };
  }
};

const Items = ({ items }: { items: Item[] }) => {
  const name = useRef<HTMLInputElement>(null);
  const kMarks = useRef<HTMLInputElement>(null);
  const factionPoints = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput: any = Array.from(form.elements).find(({ name }: any) => name === "file");
    console.log(fileInput.files);
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "item-uploads");

    const data = await fetch("https://api.cloudinary.com/v1_1/dsv9tcdvy/image/upload", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());
    // console.log("data", data.url);
    const getRes = await fetch("/api/admin/item/create-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.current?.value,
        kMarks: kMarks.current?.value,
        factionPoints: factionPoints.current?.value,
        imageUrl: data.url,
      }),
    });
    const res: Data = await getRes.json();

    if (res.status.toString().startsWith("2")) {
      toast.success(res.message);
      router.reload();
    }
  }

  return (
    <div>
      <h1>Item CRUD</h1>
      <form id="create" className="flex flex-row items-center gap-x-2" onSubmit={createItem}>
        <FloatingInputRef name="name" id="name" ref={name} label="Name" />
        <FloatingInputRef name="kMarks" id="kMarks" ref={kMarks} label="kMarks" />
        <FloatingInputRef name="factionPoints" id="factionPoints" ref={factionPoints} label="Faction Points" />
        <input name="file" type="file" />
        <button type="submit" className="px-2 border rounded-lg bg-green-500 text-white border-black">
          Add
        </button>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>kMarks</th>
              <th>Faction Points</th>
              <th>Weight</th>
            </tr>
          </thead>
          {items && (
            <tbody>
              {items.map((item: any) => (
                <tr className="text-center" key={item.id}>
                  <td>{item.imageUrl ? <Image src={item.imageUrl?.toString()} height={35} width={35} /> : ""}</td>
                  <td>{item.name}</td>
                  <td>{item.kMarks}</td>
                  <td>{item.factionPoints}</td>
                  <td>{item.weight}</td>
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
