import React, { Component, useEffect } from "react";
import tutorialService from "../service/tutorial.service";
import "../style/UpdateTutorial.css";
export default class UpdateTutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      newDescription: "",
    };
  }
  onChangeTitle = (e) => {
    this.setState({
      newTitle: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      newDescription: e.target.value,
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    console.log(this.state.newTitle + " " + this.state.newDescription);
    const data = {
      title: this.state.newTitle,
      description: this.state.newDescription,
    };
    this.props.getNewUpdate(data);
    this.setState({
      newTitle: "",
      newDescription: "",
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onUpdate}>
          <div className="form-group">
            <input
              placeholder="Title..."
              value={this.state.newTitle}
              onChange={this.onChangeTitle}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Description..."
              value={this.state.newDescription}
              onChange={this.onChangeDescription}
              className="form-control"
            />
          </div>
          <input
            type="submit"
            value="Update"
            className="btn btn-block btn-lg btn-outline-info "
          />
        </form>
      </div>
    );
  }
}
