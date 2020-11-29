import axios from "axios";
import { API_URL } from "./config";

export default {
  // fazer login
  async login(dadosLogin) {
    return await axios
      .post(`${API_URL}/login`, dadosLogin, {
        headers: {}
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  // buscar dados do login
  async dadosLogin() {
    let endpoint = `${API_URL}/login`;

    return await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * contatos
   *
   * pesquisa de contatos
   *
   */
  async contatos(dados) {
    const { page = 1, busca, per_page = 10, sortBy, sortDesc } = dados;

    let endpoint = `${API_URL}/contatos?per_page=${per_page}&page=${page}&sort_by=${sortBy}&sort_desc=${sortDesc}&busca=${encodeURIComponent(
      busca
    )}`;

    return await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * pegar contato
   *
   */
  async contatosGet(id) {
    let endpoint = `${API_URL}/contatos/${id}`;

    return await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * novo contato
   *
   */
  async contatosPost(dados) {
    let endpoint = `${API_URL}/contatos`;

    return await axios
      .post(endpoint, dados, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * editar contato
   *
   */
  async contatosPut(id, dados) {
    let endpoint = `${API_URL}/contatos/${id}`;

    return await axios
      .put(endpoint, dados, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * excluir contato
   *
   */
  async contatosDelete(id) {
    let endpoint = `${API_URL}/contatos/${id}`;

    return await axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * setores
   *
   * pesquisa de setores
   *
   */
  async setores(dados) {
    const { page = 1, busca, per_page = 10 } = dados;

    let endpoint = `${API_URL}/setores?per_page=${per_page}&page=${page}&busca=${encodeURIComponent(
      busca
    )}`;

    return await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * pegar contato
   *
   */
  async setoresGet(id) {
    let endpoint = `${API_URL}/setores/${id}`;

    return await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * novo contato
   *
   */
  async setoresPost(dados) {
    let endpoint = `${API_URL}/setores`;

    return await axios
      .post(endpoint, dados, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * editar contato
   *
   */
  async setoresPut(id, dados) {
    let endpoint = `${API_URL}/setores/${id}`;

    return await axios
      .put(endpoint, dados, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },

  /**
   *
   * excluir contato
   *
   */
  async setoresDelete(id) {
    let endpoint = `${API_URL}/setores/${id}`;

    return await axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  }
};
