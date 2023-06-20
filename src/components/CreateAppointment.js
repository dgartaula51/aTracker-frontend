import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateAppointment = () => {
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const [users, setUsers] = useState(["DummyUser"]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsername(response.data[0].username);
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDesc(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };
  const onChangeTime = (e) => {
    setTime(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      username: username,
      description: desc,
      date: date,
      time: time,
    };

    console.log(appointment);

    axios
      .post("http://localhost:5000/appointments/add", appointment)
      .then((res) => console.log(res.data));

    window.location = "/";
  };
  return (
    <div style={{ paddingTop: "25px" }}>
      <h3>Create New Appointment</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username </label>
          <select
            //ref="userInput"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description </label>
          <input
            type="text"
            required
            className="form-control"
            value={desc}
            onChange={onChangeDescription}
          />
        </div>

        <div className="form-group">
          <label>Date </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <div className="form-group">
          <label>Time </label>
          <input
            type="text"
            className="form-control"
            value={time}
            onChange={onChangeTime}
          />
        </div>

        <div className="form-group" style={{ paddingTop: "15px" }}>
          <input
            type="submit"
            value="Create Appointment"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
