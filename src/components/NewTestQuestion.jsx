import React from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import { Avatar } from "@mui/material";
import Joi from "joi-browser";

import { Typography } from "@mui/material";
class NewQuestion extends React.Component {
  state = {
    testquestion: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      questionNo: "",
      tpc: "",
    },
    error: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      questionNo: "",
      tpc: "",
    },
  };
  schema = {
    questionNo: Joi.string().required(),
    option1: Joi.string().required(),
    option2: Joi.string().required(),
    option3: Joi.string().required(),
    option4: Joi.string().required(),
    question: Joi.string().required(),
    correctAnswer: Joi.string().required(),
  };
  validate = () => {
    const errors = {};
    const result = Joi.validate(this.state.testquestion, this.schema, {
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
    const testquestion = { ...this.state.testquestion };
    testquestion[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ testquestion: testquestion });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ error: this.validate() });
    console.log(this.state.testquestion);
    axios
      .post(
        `http://localhost:8080/admin/addQuestionForTestPaper/${this.props.match.params.testQuestion}`,
        this.state.testquestion
      )
      .then((res) => {
        this.props.history.push({
          pathname: "/adminPage/managetestpaper",
          state: {
            response: "true",
          },
        });
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
            ADD NEW QUESTTION
          </h1>
          <form onSubmit={this.submitHandler} noValidate autoComplete="off">
            <div className="container mb-3 col-8 my-3">
              <label for="CN" className="form-label">
                Question
              </label>
              <input
                type="text"
                className="form-control"
                id="CN"
                name="question"
                value={this.state.testquestion.question}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.question}
                </Typography>
              )}
            </div>
            <div className="row">
              <div className="container mb-3 col-md-6 mt-md-0 mt-3">
                <label for="Option1" className="form-label">
                  Option 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Option1"
                  name="option1"
                  value={this.state.testquestion.option1}
                  onChange={this.changeHandler}
                />
                {this.state.error && (
                  <Typography variant="caption">
                    {this.state.error.option1}
                  </Typography>
                )}
              </div>

              <div className="container mb-3 col-md-6 mt-md-0 mt-3">
                <label for="Option2" className="form-label">
                  Option 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Option2"
                  name="option2"
                  value={this.state.testquestion.option2}
                  onChange={this.changeHandler}
                />
                {this.state.error && (
                  <Typography variant="caption">
                    {this.state.error.option2}
                  </Typography>
                )}
              </div>
            </div>

            <div className="row">
              <div className="container mb-3 col-md-6 mt-md-0 mt-3">
                <label for="Option3" className="form-label">
                  Option 3
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Option3"
                  name="option3"
                  value={this.state.testquestion.option3}
                  onChange={this.changeHandler}
                />
                {this.state.error && (
                  <Typography variant="caption">
                    {this.state.error.option3}
                  </Typography>
                )}
              </div>

              <div className="container mb-3 col-md-6 mt-md-0 mt-3">
                <label for="Option4" className="form-label">
                  Option 4
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Option4"
                  name="option4"
                  value={this.state.testquestion.option4}
                  onChange={this.changeHandler}
                />
                {this.state.error && (
                  <Typography variant="caption">
                    {this.state.error.option4}
                  </Typography>
                )}
              </div>
            </div>

            <div className="container mb-3 col-8">
              <label for="CA" className="form-label">
                Correct Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="CA"
                name="correctAnswer"
                value={this.state.testquestion.correctAnswer}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.correctAnswer}
                </Typography>
              )}
            </div>
            <div className="container mb-3 col-8">
              <label for="QA" className="form-label">
                Question Number
              </label>
              <input
                type="number"
                className="form-control"
                id="QA"
                name="questionNo"
                value={this.state.testquestion.questionNo}
                onChange={this.changeHandler}
              />
              {this.state.error && (
                <Typography variant="caption">
                  {this.state.error.questionNo}
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
                this.props.history.push({
                  pathname: `/adminPage/managetestpaper`,
                  state: {
                    response: "true",
                  },
                });
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
//     state: state.testquestion,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addCourse,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps())(NewQuestion);
export default NewQuestion;
