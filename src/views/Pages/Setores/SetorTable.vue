<template>
  <div id="divSetores">
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
            @click="novoSetor"
            icon
            type="primary"
            v-b-modal.modalForm
          >
            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
            Novo Setor
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
                  placeholder="Buscar por nome"
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
                <h3 class="mb-0">Lista de Setores</h3>
              </b-card-header>

              <b-table
                striped
                responsive
                hover
                :items="setores"
                :fields="fields"
              >
                <template #cell(editar_id)="data">
                  <button
                    @click="editarSetor(data.item.id)"
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
      title="Novo Setor"
      id="modalForm"
      ref="modalForm"
      v-model="modalShow"
      scrollable
      size="lg"
      @ok="salvarSetor"
    >
      <SetorForm
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
      title="Excluir setor?"
      id="modalExcluir"
      ref="modalExcluir"
      v-model="modalExcluir"
      centered
      size="sm"
      header-bg-variant="light"
      header-text-variant="danger"
      @ok="excluirRegistroConfirmacao"
    >
      Deseja excluir o setor {{ this.parentData.nome }} ?

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
import SetorForm from "./SetorForm";
import api from "../../../api/api";
import VueScrollTo from "vue-scrollto";

export default {
  components: {
    SetorForm
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
      setores: [],
      currentPage: 1,
      perPage: 10,
      rows: 0,
      overlayTable: false,
      overlayForm: false,
      fields: [
        {
          key: "nome",
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
    async handleBusca(page = 1) {
      this.overlayTable = true;
      let buscaSetores = await api.setores({
        page: page,
        busca: this.busca
      });

      this.rows = buscaSetores.data.total;
      this.setores = buscaSetores.data.data || [];

      this.overlayTable = false;
    },
    novoSetor() {
      this.parentData = {};
      this.errorMsg = "";
      this.overlayTable = false;
      this.overlayForm = false;
      this.disableBtnOK = false;
      this.disableBtnDel = true;
    },
    async salvarSetor(e) {
      e.preventDefault();
      this.errorMsg = "";
      this.overlayForm = true;
      this.disableBtnOK = true;
      this.disableBtnDel = true;

      let requestSetor;
      if (this.parentData.id) {
        requestSetor = await api.setoresPut(
          this.parentData.id,
          this.parentData
        );
      } else {
        requestSetor = await api.setoresPost(this.parentData);
      }

      if (requestSetor.status == "error") {
        this.errorMsg = requestSetor.errors.join(" - ");
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
    async editarSetor(id) {
      this.parentData = {};
      this.errorMsg = "";
      this.overlayForm = true;
      this.modalShow = true;
      this.disableBtnOK = true;
      this.disableBtnDel = true;

      const getSetor = await api.setoresGet(id);

      if (getSetor.status == "error") {
        this.$bvToast.toast(getSetor.errors.join(" - "), {
          title: "Error",
          variant: "danger",
          solid: true
        });
        this.modalShow = false;
        this.handleBusca();
      } else {
        this.parentData = getSetor.data;
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

      const deleteSetor = await api.setoresDelete(this.parentData.id);
      if (deleteSetor.status == "error") {
        this.$bvToast.toast(deleteSetor.errors.join(" - "), {
          title: "Error",
          variant: "danger",
          solid: true
        });
      } else {
        this.$bvToast.toast("Setor excluído com sucesso.", {
          title: "Exclusão de setor",
          variant: "info",
          solid: true
        });

        VueScrollTo.scrollTo("#divSetores");
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
