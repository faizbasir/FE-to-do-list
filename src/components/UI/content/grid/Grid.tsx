import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import "./styles/Grid.scss";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTasks } from "../../../store/todoSlice";

interface task {
  id: number;
  summary: string;
  completed: boolean;
  dueDate: string;
}

const Grid = () => {
  ModuleRegistry.registerModules([ClientSideRowModelModule]);

  const appDispatch = useAppDispatch();
  const taskList = useAppSelector((state) => state.todo.tasks);
  const gridRef = useRef();
  const [rowData, setRowData] = useState<task[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id" },
    { field: "summary" },
    { field: "dueDate" },
    { field: "status" },
    {
      field: "actions",
      cellRenderer: "agCheckboxCellRenderer",
      cellRendererParams: { disabled: false },
    },
  ]);

  useEffect(() => {
    appDispatch(fetchTasks());
  }, []);

  useEffect(() => {
    setRowData(taskList);
  }, [taskList]);

  return (
    <>
      <div className="ag-theme-alpine-dark">
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    </>
  );
};

export default Grid;
