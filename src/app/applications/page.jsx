"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Input from "@/app/components/Input";
import { FaPlus, FaRegBuilding } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import AddToKanban from "./AddToKanban";
import {
  useAddApplicationMutation,
  useDeleteApplicationMutation,
  useEditApplicationMutation,
  useGetApplicationsQuery,
} from "@/redux/features/applications/applicationsApiSlice";
import { groupApplicationsByStatus } from "@/utils/helpers";
import { useSelector } from "react-redux";
import { statusOptions } from "@/constants/status";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { unparse } from "papaparse";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const emojis = ["📋", "🧑‍💼", "✅", "🎉", "❌", "👻"];

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [columns, setColumns] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [application, setApplication] = useState({
    job_name: "",
    company_name: "",
    status: "",
    link: "",
    salary: "",
    uid: user?.id,
  });
  const [statusId, setStatusId] = useState(0);

  const [addApplication] = useAddApplicationMutation();
  const [editApplication] = useEditApplicationMutation();
  const [deleteApplication] = useDeleteApplicationMutation();

  const {
    data: applications,
    refetch,
    error,
  } = useGetApplicationsQuery(user?.id);

  const printableDivRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(ROUTES.LOGIN);
    }
  }, []);

  useEffect(() => {
    if (applications) {
      const filtered = applications.filter((app) => {
        const term = searchTerm.toLowerCase();
        return (
          app.job_name?.toLowerCase().includes(term) ||
          app.company_name?.toLowerCase().includes(term) ||
          app.link?.toLowerCase().includes(term) ||
          app.salary?.toLowerCase().includes(term)
        );
      });

      setColumns(groupApplicationsByStatus(filtered));
    }
  }, [applications, debouncedSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const openAddModal = (status) => {
    const id = statusOptions.find((stat) => stat.name === status).value;
    setApplication({
      ...application,
      status,
    });

    setStatusId(id);
    setShowAddModal(true);
  };

  const onDragEnd = async (result) => {
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

    const app = applications.find((app) => app.id === movedItem.id);
    await onSubmit(null, { ...app, status: destination.droppableId });
  };

  const onAppChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const onListChange = (e) => {
    const selectedValue = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;

    setStatusId(selectedValue);
    setApplication({
      ...application,
      status: selectedText,
    });
  };

  // ADD OR EDIT APPLICATION 
  const onSubmit = async (e, editedApp) => {
    e?.preventDefault();
    
    const action = isEditing || editedApp ? editApplication : addApplication;
    try {
      const res = await action(editedApp || application).unwrap();
      await refetch();
      setShowAddModal(false);
      toast.success(res.message);
    } catch (e) {
      toast.error(e?.data?.detail || e?.error || error?.error);
    } finally {
      setApplication({
        job_name: "",
        company_name: "",
        status: "",
        link: "",
        salary: "",
        uid: user.id,
      });
    }
  };

  const handleEditMode = (e, appId) => {
    e.stopPropagation();

    const app = applications.find((app) => app.id === appId);
    const id = statusOptions.find((stat) => stat.name === app.status).value;

    setApplication(app);
    setStatusId(id);
    setIsEditing(true);
    setShowAddModal(true);
  };

  // DELETE APPLICATION 
  const onDeleteApp = async (e, id) => {
    e.stopPropagation();

    try {
      const res = await deleteApplication(id).unwrap();
      await refetch();
      toast(res.message, { icon: "🗑️" });
    } catch (error) {
      toast.error(e?.data?.detail || e?.error || error?.error);
    }
  };

  // EXPORT AS CSV 
  const handleExportCSV = () => {
    const flatList = applications.map((app) => ({
      "Job Title": app.job_name,
      "Company Name": app.company_name,
      Link: app.link.startsWith("http") ? app.link : `https://${app.link}`,
      Salary: app.salary,
      Status: app.status,
    }));

    const csv = unparse(flatList);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // EXPORT AS PDF 
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const rows = applications.map((app) => [
      app.job_name,
      app.company_name,
      app.link.startsWith("http") ? app.link : `https://${app.link}`,
      app.status,
      app.salary
    ]);

    autoTable(doc, {
      head: [["Job Title", "Company Name", "Link", "Status", "Salary"]],
      body: rows,
    });

    doc.save("applications.pdf");
  };

  // PRINT 
  const handlePrint = useReactToPrint({
    contentRef: printableDivRef,
    documentTitle: "Job Applications",
  });

  return (
    <Layout pageName={"Applications"}>
      <div className="sm:flex items-center justify-between">
        <Input
          placeholder={"Search applications"}
          className={"w-full mb-4 sm:mb-0 sm:w-[200px] lg:w-[300px]"}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 text-xs md:text-sm">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            Export CSV
          </button>

          <button
            onClick={handleExportPDF}
            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            Export PDF
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="flex gap-4 mt-10 overflow-x-auto h-full"
          ref={printableDivRef}
        >
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
                          onClick={(e) => handleEditMode(e, card.id)}
                          className="bg-white p-2 mb-2 rounded shadow"
                        >
                          <div className="font-semibold">{card.jobName}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                            <FaRegBuilding /> {card.companyName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <RiMoneyDollarCircleLine />
                            {card.salary || "--"}
                          </div>
                          <div className="flex justify-between items-cente mt-2">
                            <a
                              href={card.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Job
                            </a>
                            <button
                              className="text-red-400 cursor-pointer"
                              onClick={(e) => onDeleteApp(e, card.id)}
                            >
                              <TiDelete />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <button
                    onClick={() => openAddModal(status)}
                    className="text-xs text-primary flex items-center gap-x-1 mt-3 cursor-pointer"
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
        <AddToKanban
          isEditing={isEditing}
          statusId={statusId}
          onAppChange={onAppChange}
          onListChange={onListChange}
          onSubmit={onSubmit}
          application={application}
          setShowAddModal={setShowAddModal}
          userId={user.id}
        />
      )}
    </Layout>
  );
};

export default Applications;
