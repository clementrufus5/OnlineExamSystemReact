import React, { Component } from "react";
import axios from "axios";
import AdminAppBar from "./AdminNavbar";

import Joi from "joi-browser";

import { Typography } from "@mui/material";
class ChangeTestPaper extends Component {
  state = {
    exam: {
      studentId: "",
      enrollmentId: "",
      testPaperCode: "",
      examRollNo: "",
    },
    enrolls: [], //All Enrollments
    student: [], //All Students
    testpapers: [],
    exams: [],
    error: {
      studentId: "",
      enrollmentId: "",
      testPaperCode: "",
      examRollNo: "",
    },
  };
  schema = {
    studentId: Joi.string().min(2).required(),
    enrollmentId: Joi.string().min(3).required(),
    testPaperCode: Joi.string().required(),
    examRollNo: Joi.string().required(),
  };
  validate = () => {
    const errors = {};
    const result = Joi.validate(this.state.exam, this.schema, {
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
      .get("http://localhost:8080/admin/getExams")
      .then((res) => {
        console.log(res.data);
        this.setState({ exams: res.data });
        console.log(this.state.exams);
      })
      .catch((error) => alert(error.response.data.message));
    axios
      .get("http://localhost:8080/admin/getAllTestPapers")
      .then((res) => {
        console.log(res.data);
        this.setState({ testpapers: res.data });
        console.log(this.state.testpapers);
      })
      .catch((error) => alert(error.response.data.message));
    axios
      .get("http://localhost:8080/admin/getStudents")
      .then((res) => {
        console.log(res.data);
        this.setState({ student: res.data });
        console.log(this.state.student);
      })
      .catch((error) => alert(error.response.data.message));
    axios
      .get("http://localhost:8080/admin/getEnrollments")
      .then((res) => {
        console.log(res.data);
        this.setState({ enrolls: res.data });
        console.log(this.state.enrolls);
      })
      .catch((error) => alert(error.response.data.message));
  }

  handleChange = (event) => {
    const Papers = { ...this.state.exam };
    Papers[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ exam: Papers });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ error: this.validate() });
    console.log("handleSubmit");
    const enrollments = {
      studentId: this.state.exam.studentId,
      enrollmentId: this.state.exam.enrollmentId,
      testPaperCode: this.state.exam.testPaperCode,
      examRollNo: this.state.exam.examRollNo,
    };
    console.log(enrollments);
    //http://localhost:8080/admin/updateTestPaperForStudent/{studentId}/{enrollmentId}/{testPaperCode}/{examrollno}
    axios
      .put(
        `http://localhost:8080/admin/updateTestPaperForStudent/${enrollments.studentId}/${enrollments.enrollmentId}/${enrollments.testPaperCode}/${enrollments.examRollNo}`
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
        <h3 class="text-center mt-5">Change Test Paper For Student</h3>
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
              value={this.state.exam.studentId}
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
              Enrollment ID
            </label>
            <select
              id="inputState"
              class="form-select"
              name="enrollmentId"
              value={this.state.enrolls.enrollmentId}
              onChange={this.handleChange}
            >
              <option selected>select-!-</option>
              {this.state.enrolls.map((opt) => (
                <option value={opt.enrollmentId}>{opt.enrollmentId}</option>
              ))}
            </select>
            {this.state.error && (
              <Typography variant="caption">
                {this.state.error.enrollmentId}
              </Typography>
            )}
          </div>
          <div class="col-md-12 mb-3">
            <label for="tpc" class="form-label">
              Test Paper Code
            </label>
            <select
              id="tpc"
              class="form-select"
              name="testPaperCode"
              value={this.state.testpapers.testPaperCode}
              onChange={this.handleChange}
            >
              <option selected>select-!-</option>
              {this.state.testpapers.map((opt) => (
                <option value={opt.testPaperCode}>{opt.testPaperCode}</option>
              ))}
            </select>
            {this.state.error && (
              <Typography variant="caption">
                {this.state.error.testPaperCode}
              </Typography>
            )}
          </div>
          <div class="col-md-12 mb-3">
            <label for="ern" class="form-label">
              Exam RollNo
            </label>
            <select
              id="ern"
              class="form-select"
              name="examRollNo"
              value={this.state.exams.examRollNo}
              onChange={this.handleChange}
            >
              <option selected>select-!-</option>
              {this.state.exams.map((opt) => (
                <option value={opt.examRollNo}>{opt.examRollNo}</option>
              ))}
            </select>
            {this.state.error && (
              <Typography variant="caption">
                {this.state.error.examRollNo}
              </Typography>
            )}
          </div>
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

export default ChangeTestPaper;
