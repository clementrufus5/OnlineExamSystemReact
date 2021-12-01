import React from "react";
import "./CSS/NewCourse.css";
import axios from "axios";
import { IconButton } from "@mui/material";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import { Avatar } from "@mui/material";
import Joi from "joi-browser";
import { Typography } from "@mui/material";
class NewCourse extends React.Component {
  state = {
    course: {
      courseName: "",
      courseType: "",
      description: "",
      batchName: "",
      image: "",
    },
    error: {
      courseName: "",
      courseType: "",
      description: "",
      batchName: "",
      image: "",
    },
  };

  schema = {
    courseName: Joi.string().min(2).required(),
    batchName: Joi.string().min(3).required(),
    courseType: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  };
  validate = () => {
    const errors = {};
    const result = Joi.validate(this.state.course, this.schema, {
      abortEarly: false,
    });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  changeHandler = (event) => {
    const course = { ...this.state.course };
    course[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ course: course });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ error: this.validate() });
    console.log(this.state.error);
    console.log(this.state.course);
    axios
      .post("http://localhost:8080/admin/addNewCourse", this.state.course)
      .then((res) => {
        this.props.history.push("/admin/Courses/true");
      });
  };
  render() {
    return (
      <div className="images">
        <div
          className="container w-50 bg-light text-dark mt-4 pt-3 pb-3 shadow-lg rounded"
          id="main1"
        >
          <h1 className="color-primary" id="h1">
            ADD NEW COURSE
          </h1>
          <form onSubmit={this.submitHandler} noValidate autoComplete="off">
            <div className="container mb-3 col-8 my-3">
              <label for="CN" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                className="form-control"
                id="CN"
                name="courseName"
                value={this.state.course.courseName}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.courseName}
                </Typography>
              )}
            </div>
            <div className="container mb-3 col-8">
              <label for="CT" className="form-label">
                Course Type
              </label>
              <input
                type="text"
                className="form-control"
                id="CT"
                name="courseType"
                value={this.state.course.courseType}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.courseType}
                </Typography>
              )}
            </div>
            <div className="container mb-3 col-8">
              <label for="des" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="des"
                name="description"
                value={this.state.course.description}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.description}
                </Typography>
              )}
            </div>
            <div className="container mb-3 col-8">
              <label for="batchName" className="form-label">
                Batch Name
              </label>
              <input
                type="text"
                className="form-control"
                id="batchName"
                name="batchName"
                value={this.state.course.batchName}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.batchName}
                </Typography>
              )}
            </div>
            <div className="container mb-3 col-8">
              <label for="imge" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="imge"
                name="image"
                value={this.state.course.image}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.image}
                </Typography>
              )}
            </div>
            <div classNameName="my-3">
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </div>
            <IconButton
              onClick={() => {
                this.props.history.push("/admin/Courses/true");
              }}
            >
              <Avatar
                style={{ backgroundColor: "#47d247", margin: "0px auto" }}
              >
                <ArrowBackIosSharpIcon />
              </Avatar>
            </IconButton>
          </form>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state, ownProps) => {
//   return {
//     state: state.course,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCourse,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps())(NewCourse);
export default NewCourse;
