import http from "../http-common";
import React, { Component, useEffect } from "react";
class TutorialDataService {
  getAll() {
    return http.get("/tutorials/read");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials/create", data);
  }
  update(id, data) {
    return http.put(`/tutorials/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();
