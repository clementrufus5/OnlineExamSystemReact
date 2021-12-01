import React, { Component } from "react";
import axios from "axios";
import AdminAppBar from "./AdminNavbar";

import Joi from "joi-browser";

import { Typography } from "@mui/material";

class AddNewEnrollment extends Component {
  state = {
    enroll: {
      studentId: "",
      courseId: "",
      batchName: "",
    },
    courses: [],
    student: [],
    enrollments: [],
    error: {
      studentId: "",
      courseId: "",
      batchName: "",
    },
  };
  schema = {
    courseId: Joi.string().required(),
    batchName: Joi.string().required(),
    studentId: Joi.string().required(),
  };
  validate = () => {
    const errors = {};
    const result = Joi.validate(this.state.enroll, this.schema, {
      abortEarly: false,
    });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/admin/getStudents")
      .then((res) => {
        console.log(res.data);
        this.setState({ student: res.data });
        console.log(this.state.student);
      })
      .catch((error) => alert(error.response.data.message));
    axios
      .get("http://localhost:8080/student/getallCourses")
      .then((res) => {
        console.log(res.data);
        this.setState({ courses: res.data });
        console.log(this.state.courses);
      })
      .catch((error) => alert(error.response.data.message));
  }

  handleChange = (event) => {
    const students = { ...this.state.enroll };
    students[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ enroll: students });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    this.setState({ error: this.validate() });
    const enrollments = {
      studentId: this.state.enroll.studentId,
      courseId: this.state.enroll.courseId,
      batchName: this.state.enroll.batchName,
    };
    console.log(enrollments);
    axios
      .post(
        `http://localhost:8080/admin/enrollstudent/${enrollments.studentId}/${enrollments.courseId}/${enrollments.batchName}`
      )
      .then((res) => {
        this.props.history.push({
          pathname: "/adminPage/adminEnrollStudent",
        });
      });
  };
  render() {
    return (
      <div>
        <AdminAppBar />
        <h3 class="text-center mt-5">Enroll Student</h3>
        <form
          className="w-50 mx-auto border p-3"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <div class="col-md-12 mb-3">
            <label for="inputState" class="form-label">
              Student ID
            </label>
            <select
              id="inputState"
              class="form-select"
              name="studentId"
              value={this.state.enroll.studentId}
              onChange={this.handleChange}
            >
              <option selected>select-!-</option>
              {this.state.student.map((opt) => (
                <option value={opt.studentId}>{opt.studentId}</option>
              ))}
            </select>
            {this.state.error && (
              <Typography variant="caption">
                {this.state.error.studentId}
              </Typography>
            )}
          </div>
          <div class="col-md-12 mb-3">
            <label for="inputState" class="form-label">
              Course Name
            </label>
            <select
              id="inputState"
              class="form-select"
              name="courseId"
              value={this.state.enroll.courseId}
              onChange={this.handleChange}
            >
              <option selected>select-!-</option>
              {this.state.courses.map((opt) => (
                <option value={opt.courseId}>{opt.courseName}</option>
              ))}
            </select>
            {this.state.error && (
              <Typography variant="caption">
                {this.state.error.courseId}
              </Typography>
            )}
          </div>
          <div class="col-md-12 mb-3">
            <label for="inputState" class="form-label">
              Batch Name
            </label>
            <select
              id="inputState"
              class="form-select"
              name="batchName"
              value={this.state.enroll.batchName}
              onChange={this.handleChange}
            >
              <option selected>select-!-</option>
              {this.state.courses.map((opt) => (
                <option value={opt.batchName}>{opt.batchName}</option>
              ))}
            </select>
            {this.state.error && (
              <Typography variant="caption">
                {this.state.error.batchName}
              </Typography>
            )}
          </div>
          {/* <div class="col-12">
            <label for="batchName" class="form-label">
              Batch Name
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Batch Name"
              name="batchName"
              value={this.state.enroll.batchName}
              onChange={this.handleChange}
            />
          </div> */}
          <div class="d-grid gap-2 mt-5">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewEnrollment;
