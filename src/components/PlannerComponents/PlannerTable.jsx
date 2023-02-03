import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import TableRow from "./TableRow";

export default function PlannerTable({ data }) {
  const [attractions, setAttractions] = useState(data);
  const tableHead = ["Name", "Category", "Time", "URL", "Edit"];

  return (
    <>
      <Table className="w-75 mx-auto my-5">
        <thead>
          <tr>
            {tableHead.map((title) => {
              return <th>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {attractions.map((data) => {
            return <TableRow data={data} />;
          })}
        </tbody>
      </Table>
    </>
  );
}
