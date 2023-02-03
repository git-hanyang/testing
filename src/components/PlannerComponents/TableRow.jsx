import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function TableRow({ data }) {
  const [attraction, setAttraction] = useState(data);
  const [edit, setEdit] = useState(false);

  function toggleEdit() {
    setEdit(!edit);
  }

  function handleSave() {}

  const renderTime = (str) => {
    const date = new Date(str);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${("00" + hour).slice(-2)}:${("00" + minute).slice(-2)}`;
    return time;
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            <Form.Control type="text" value={attraction.name} />
          </td>
          <td>
            <Form.Select defaultValue={attraction.category}>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
              <option>Category 4</option>
              <option value="Sightseeing">Sightseeing</option>
            </Form.Select>
          </td>
          <td>
            <Form.Control type="text" value={renderTime(attraction.date)} />
          </td>
          <td>
            <Form.Control type="text" value={attraction.url} />
          </td>
        </>
      ) : (
        <>
          <td>{attraction.name}</td>
          <td>{attraction.category}</td>
          <td>{renderTime(attraction.date)}</td>
          <td>{attraction.url}</td>
        </>
      )}

      <td>
        {edit ? (
          <Button type="button" variant="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button type="button" variant="outline-primary" onClick={toggleEdit}>
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
}
