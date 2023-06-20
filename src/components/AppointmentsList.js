import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const Appointment = (props) => (
//   <tr>
//     <td>{props.username}</td>
//     <td>{props.description}</td>
//     <td>{props.date}</td>
//     <td>{props.time}</td>
//     <td>
//       <Link to={"/edit/" + props._id}>edit</Link> |{" "}
//       <button
//         onClick={() => {
//           props.deleteAppt(props._id);
//         }}
//       >
//         delete
//       </button>
//     </td>
//   </tr>
// );

//console.log(Appointment);

const AppointmentsList = () => {
  const [appt, setAppt] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments/")
      .then((response) => {
        setAppt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!appt) return null;

  const deleteAppt = (id) => {
    axios
      .delete("http://localhost:5000/appointments/" + id)
      .then((response) => {
        console.log(response.data);
      });

    setAppt(appt.filter((el) => el._id !== id));
  };

  const returnAppts = () => {
    return appt.map((currentappt) => {
      return (
        <tr key={currentappt._id}>
          <td>{currentappt.username}</td>
          <td>{currentappt.description}</td>
          <td>{currentappt.date.substring(0, 10)}</td>
          <td>{currentappt.time}</td>
          <td>
            <Link to={"/edit/" + currentappt._id}>
              <button className="btn link-primary">Edit</button>
            </Link>
            |
            <button
              className="btn link-danger"
              onClick={() => {
                deleteAppt(currentappt._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div style={{ paddingTop: "25px" }}>
      <h3>Appointment Logs</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{returnAppts()}</tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
