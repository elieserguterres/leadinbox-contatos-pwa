<template>
  <div id="divContatos">
    <div
      class="header pb-8 pt-3 d-flex align-items-center profile-header"
      style="
        min-height: 320px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <span class="mask bg-gradient-success opacity-8"></span>

        <div class="d-flex justify-content-end">
          <base-button
            @click="novoContato"
            icon
            type="primary"
            v-b-modal.modalForm
          >
            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
            Novo Contato
          </base-button>
        </div>
      </b-container>
    </div>

    <b-container fluid class="mt--9">
      <b-row class="mb-4">
        <b-col>
          <b-card>
            <b-row>
              <b-col md="12">
                <base-input
                  v-model="busca"
                  @keyup="handleBusca()"
                  type="text"
                  placeholder="Buscar por nome, ramal, setor, email"
                ></base-input>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-overlay
        :show="overlayTable"
        rounded="sm"
        spinner-type="grow"
        spinner-variant="primary"
      >
        <b-row id="Tabela">
          <b-col>
            <b-card no-body>
              <b-card-header class="border-0">
                <h3 class="mb-0">Lista de Contatos</h3>
              </b-card-header>

              <b-table
                striped
                responsive
                hover
                :items="contatos"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @sort-changed="sortTableChange"
              >
                <template #cell(editar_id)="data">
                  <button
                    @click="editarContato(data.item.id)"
                    class="btn btn-outline-primary"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </template>
              </b-table>

              <b-card-footer class="py-4 d-flex justify-content-end">
                <base-pagination
                  @change="handlePageChange"
                  v-model="currentPage"
                  :per-page="perPage"
                  :total="rows"
                ></base-pagination>
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>
      </b-overlay>
      <div class="mt-5"></div>
    </b-container>

    <b-modal
      title="Novo Contato"
      id="modalForm"
      ref="modalForm"
      v-model="modalShow"
      size="lg"
      @ok="salvarContato"
    >
      <ContatoForm
        :inputData.sync="parentData"
        :errorMsg="errorMsg"
        :overlay="overlayForm"
      />

      <template #modal-footer="{ ok }">
        <b-button
          size="sm"
          :disabled="disableBtnDel == 1"
          variant="outline-danger"
          @click="excluirRegistro"
        >
          Excluir
        </b-button>

        <b-button
          :disabled="disableBtnOK == 1"
          size="lg"
          variant="success"
          @click="ok()"
        >
          Salvar
        </b-button>
      </template>
    </b-modal>

    <!-- moda exclusao -->
    <b-modal
      title="Excluir contato?"
      id="modalExcluir"
      ref="modalExcluir"
      v-model="modalExcluir"
      centered
      size="sm"
      header-bg-variant="light"
      header-text-variant="danger"
      @ok="excluirRegistroConfirmacao"
    >
      Deseja excluir o contato {{ this.parentData.nome }} ?

      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="outline-danger" @click="cancel()">
          Cancelar
        </b-button>

        <b-button
          size="lg"
          variant="danger"
          @click="excluirRegistroConfirmacao"
        >
          Excluir
        </b-button>
      </template>
    </b-modal>
    <!-- /moda exclusao -->
  </div>
</template>
<script>
import ContatoForm from "./ContatoForm";
import api from "../../../api/api";
import VueScrollTo from "vue-scrollto";

export default {
  components: {
    ContatoForm
  },
  data() {
    return {
      disableBtnOK: true,
      disableBtnDel: true,
      errorMsg: "",
      parentData: {},
      modalShow: false,
      modalExcluir: false,
      busca: "",
      contatos: [],
      currentPage: 1,
      perPage: 10,
      rows: 0,
      overlayTable: false,
      overlayForm: false,
      sortBy: "nome",
      sortDesc: false,
      fields: [
        {
          key: "nome",
          sortable: true
        },
        {
          key: "setor_nome",
          label: "Setor",
          sortable: true
        },
        {
          key: "ramal",
          sortable: true
        },
        {
          key: "editar_id",
          label: "Editar"
        }
      ]
    };
  },
  methods: {
    async handlePageChange(value) {
      this.handleBusca(value);

      VueScrollTo.scrollTo("#Tabela");
    },
    async sortTableChange(table) {
      this.overlayTable = true;
      this.contatos = [];

      this.sortBy = table.sortBy;
      this.sortDesc = table.sortDesc;

      this.handleBusca();

      VueScrollTo.scrollTo("#Tabela");
    },
    async handleBusca(page = 1) {
      this.overlayTable = true;
      let buscaContatos = await api.contatos({
        page: page,
        busca: this.busca,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      });

      this.rows = buscaContatos.data.total;
      this.contatos = buscaContatos.data.data || [];

      this.overlayTable = false;
    },
    novoContato() {
      this.parentData = {};
      this.errorMsg = "";
      this.overlayTable = false;
      this.overlayForm = false;
      this.disableBtnOK = false;
      this.disableBtnDel = true;
    },
    async salvarContato(e) {
      e.preventDefault();
      this.errorMsg = "";
      this.overlayForm = true;
      this.disableBtnOK = true;
      this.disableBtnDel = true;

      let requestContato;
      if (this.parentData.id) {
        requestContato = await api.contatosPut(
          this.parentData.id,
          this.parentData
        );
      } else {
        requestContato = await api.contatosPost(this.parentData);
      }

      if (requestContato.status == "error") {
        this.errorMsg = requestContato.errors.join(" - ");
      } else {
        this.modalShow = false;
        this.handleBusca();
      }

      this.disableBtnOK = false;
      if (this.parentData.id == undefined) {
        this.disableBtnDel = true;
      } else {
        this.disableBtnDel = false;
      }
      this.overlayForm = false;
    },
    async editarContato(id) {
      this.parentData = {};
      this.errorMsg = "";
      this.overlayForm = true;
      this.modalShow = true;
      this.disableBtnOK = true;
      this.disableBtnDel = true;

      const getContato = await api.contatosGet(id);

      if (getContato.status == "error") {
        this.$bvToast.toast(getContato.errors.join(" - "), {
          title: "Error",
          variant: "danger",
          solid: true
        });
        this.modalShow = false;
        this.handleBusca();
      } else {
        this.parentData = getContato.data;
        this.overlayForm = false;
        this.disableBtnOK = false;
        this.disableBtnDel = false;
      }
    },
    async excluirRegistro() {
      this.modalExcluir = true;
    },
    async excluirRegistroConfirmacao() {
      this.overlayForm = true;
      this.disableBtnOK = true;
      this.disableBtnDel = true;
      this.modalExcluir = false;

      const deleteContato = await api.contatosDelete(this.parentData.id);
      if (deleteContato.status == "error") {
        this.$bvToast.toast(deleteContato.errors.join(" - "), {
          title: "Error",
          variant: "danger",
          solid: true
        });
      } else {
        this.$bvToast.toast("Contato excluído com sucesso.", {
          title: "Exclusão de contato",
          variant: "info",
          solid: true
        });

        VueScrollTo.scrollTo("#divContatos");
      }

      this.handleBusca();
      this.modalShow = false;
      this.disableBtnOK = false;
      this.disableBtnDel = false;
      this.overlayForm = false;
    }
  },
  async created() {
    this.handleBusca();
  },
  computed: {}
};
</script>

<style></style>
