import React, { Component, useEffect } from "react";
import tutorialService from "../service/tutorial.service";
import "../style/Tutorials.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTutorial from "./update-tutorial.component";
export default class ListTutorials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tutorials: [],
      UpdateTutorialId: "",
    };
    tutorialService.getAll().then((res) => {
      this.setState({
        Tutorials: res.data,
      });
    });
    this.updateForm = React.createRef();
  }
  onDeleteTutorial = (_id) => {
    const styleToast = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    toast("Deleting ... ", styleToast);
    tutorialService.delete(_id).then((res) => {
      toast.error("Deleted ID: " + _id, styleToast);
      this.setState({
        Tutorials: this.state.Tutorials.filter((tul) => tul._id !== _id),
      });
      console.log(res.data);
    });
  };
  onUpdateTutorial = (_id) => {
    this.updateForm.current.className = "updateTutorialShow";
    this.setState({
      UpdateTutorialId: _id,
    });
  };
  closeUpdateForm = () => {
    this.updateForm.current.className = "updateTutorial";
  };
  callBackGetNewUpdate = (newUpdateData) => {
    const _id = this.state.UpdateTutorialId;
    const styleToast = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    toast("Updating...", styleToast);
    this.updateForm.current.className = "updateTutorial";

    tutorialService.update(_id, newUpdateData).then((res) => {
      console.log(res.data);
      const listNewTul = this.state.Tutorials.map((tul) => {
        if (tul._id === _id) {
          return { ...{ _id }, ...newUpdateData };
        }
        return tul;
      });
      this.setState({ Tutorials: listNewTul });
      toast.info("Updated ID: " + _id, styleToast);
    });
  };
  render() {
    return (
      <div>
        <ToastContainer />
        <h1> Tutorials List:</h1>
        <div className="updateTutorial" ref={this.updateForm}>
          <button
            type="button"
            class="btn btn-danger btn-lg closeUpdateTutorial"
            onClick={this.closeUpdateForm}
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
          <div className="updateForm">
            <UpdateTutorial getNewUpdate={this.callBackGetNewUpdate} />
          </div>
          <div className="blackBackground"></div>
        </div>
        <table className="table">
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th></th>
          </tr>
          {this.state.Tutorials.map((Tutorial, id) => {
            return (
              <tr key={id}>
                <td>{Tutorial._id}</td>
                <td>{Tutorial.title}</td>
                <td>{Tutorial.description}</td>
                <td className="settingTutorials">
                  <button
                    onClick={() => this.onDeleteTutorial(Tutorial._id)}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  <button
                    onClick={() => this.onUpdateTutorial(Tutorial._id)}
                    type="button"
                    className="btn btn-outline-dark"
                  >
                    <i className="fa fa-refresh"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
