"use client";
import Layout from "@/components/Layout/Layout";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Input from "@/components/Input";
import { FaPlus } from "react-icons/fa6";
import AddToKanban from "./AddToKanban";

const initialData = {
  Applied: [
    {
      id: "1",
      jobName: "Frontend Engineer",
      companyName: "TechNova",
      link: "https://example.com/job/frontend-engineer",
    },
    {
      id: "2",
      jobName: "React Developer",
      companyName: "CodeWorks",
      link: "https://example.com/job/react-developer",
    },
  ],
  Interviewing: [
    {
      id: "3",
      jobName: "UI/UX Developer",
      companyName: "Designify",
      link: "https://example.com/job/uiux",
    },
  ],
  Hired: [
    {
      id: "4",
      jobName: "Web Developer",
      companyName: "PixelEdge",
      link: "https://example.com/job/web-dev",
    },
  ],
  Rejected: [
    {
      id: "5",
      jobName: "Software Engineer",
      companyName: "OldTech Inc",
      link: "https://example.com/job/software",
    },
  ],
  Ghosted: [
    {
      id: "6",
      jobName: "Fullstack Developer",
      companyName: "SilentStartup",
      link: "https://example.com/job/fullstack",
    },
  ],
};

const emojis = ["📋", "🧑‍💼", "✅", "❌", "👻"];

const Applications = () => {
  const [columns, setColumns] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeListId, setActiveListId] = useState(0);

  const openAddModal = (id) => {
    setActiveListId(id);
    setShowAddModal(true);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedItem] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedItem);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
      }));
    } else {
      destCol.splice(destination.index, 0, movedItem);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      }));
    }
  };

  return (
    <Layout pageName={"Applications"}>
      <div>
        <Input placeholder={"Search applications"} className={"w-1/3"} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 mt-10 overflow-x-auto h-full">
          {Object.entries(columns).map(([status, cards], i) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-80 bg-gray-50 rounded p-4 flex-shrink-0 h-full"
                >
                  <h3 className="font-medium text-sm text-gray-500 uppercase mb-2">
                    {emojis[i]} {status}
                  </h3>
                  {cards.map((card, index) => (
                    <Draggable
                      draggableId={card.id}
                      index={index}
                      key={card.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          <div className="font-semibold">{card.jobName}</div>
                          <div className="text-sm text-gray-500">
                            {card.companyName}
                          </div>
                          <a
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-xs"
                          >
                            View Job
                          </a>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <button
                    onClick={() => openAddModal(i)}
                    className="text-xs text-primary flex items-center gap-x-1 mt-3"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {showAddModal && (
        <AddToKanban listId={activeListId} setShowAddModal={setShowAddModal} />
      )}
    </Layout>
  );
};

export default Applications;
