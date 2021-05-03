import React, { Component } from "react";
import "../style/AddTutorial.css";
import TutorialDataService from "../service/tutorial.service";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
    };
  }
  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onChangeDepcription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  saveTutorial = (e) => {
    const styleToast = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    toast("Creating... ", styleToast);
    e.preventDefault();
    let data = {
      title: this.state.title,
      description: this.state.description,
      published: false,
    };
    TutorialDataService.create(data)
      .then((res) => {
        toast.success("Create Successing", styleToast);
        this.setState({ title: "", description: "" });
      })
      .catch((error) => {
        if (!error.response) {
          // network error
          this.errorStatus = "Error: Network Error";
        } else {
          this.errorStatus = error.response.data.message;
        }
      });
  };
  render() {
    return (
      <div>
        <ToastContainer />
        <h1>Add Tutorial</h1>
        <form onSubmit={this.saveTutorial}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.onChangeTitle}
              className="form-control"
              name="title"
              placeholder="Title"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={this.onChangeDepcription}
              className="form-control"
              name="decription"
              placeholder="Decription"
              value={this.state.description}
            />
          </div>
          <input
            className="btn btn-block btn-lg btn-outline-info"
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    );
  }
}
