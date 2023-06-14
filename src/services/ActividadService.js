import axios from "axios";
import { post } from "jquery";

export class ActividadService {
  noCia = localStorage.getItem("NO_CIA");

  create() {
    return post
      .get(axios.getUri() + `/ACTIVIDAD/Insert/`, actividad)
      .then((res) => data);
  }

  readAll(nocia, token) {
    const data = axios
      .get(`/api/ACTIVIDAD/Select/${nocia}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

    return data;
  }

  update(id) {
    return axios
      .put(axios.getUri() + `/ACTIVIDAD/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => data);
  }

  delete(id, token) {
    const data = axios
      .delete(`/api/ACTIVIDAD/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);

    return data;
  }
}
