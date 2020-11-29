<template>
  <card>
    <base-alert v-if="errorMsg" type="danger">{{ errorMsg }}</base-alert>

    <b-overlay
      :show="overlay"
      rounded="sm"
      spinner-type="grow"
      spinner-variant="primary"
    >
      <b-form>
        <b-row>
          <b-col lg="8">
            <base-input
              type="text"
              label="Nome"
              placeholder="Nome"
              v-model="inputData.nome"
              @keyup="$emit('update:inputData', inputData)"
            >
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              type="text"
              label="Ramal"
              placeholder="Ramal"
              v-model="inputData.ramal"
              v-mask="'####'"
              @keyup="$emit('update:inputData', inputData)"
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4">
            <base-input
              type="text"
              label="Celular"
              placeholder="Celular"
              v-model="inputData.celular"
              v-mask="['(##) ####-####', '(##) #####-####']"
              @keyup="$emit('update:inputData', inputData)"
            >
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              type="text"
              label="Telefone"
              placeholder="Telefone"
              v-model="inputData.telefone"
              v-mask="['(##) ####-####', '(##) #####-####']"
              @keyup="$emit('update:inputData', inputData)"
            >
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              type="text"
              label="E-mail"
              placeholder="E-mail"
              v-model="inputData.email"
              @keyup="$emit('update:inputData', inputData)"
            >
            </base-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <b-form-group id="fieldset-1" label="Setor" label-for="input-1">
              <v-select
                :options="listaSetores"
                label="nome"
                :reduce="listaSetores => listaSetores.id"
                v-model="inputData.setor_id"
                @input="$emit('update:inputData', inputData)"
              >
                <template v-slot:option="option">
                  {{ option.nome }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-overlay>
  </card>
</template>

<script>
import vSelect from "vue-select";
import { mask } from "vue-the-mask";
import api from "../../../api/api";

export default {
  directives: { mask },
  props: {
    errorMsg: "",
    inputData: {},
    overlay: false
  },
  data() {
    return {
      busca: "",
      listaSetores: [],
      setorSelecionado: ""
    };
  },
  created() {
    this.listarSetores();
  },
  methods: {
    async listarSetores() {
      let apiSetores = await api.setores({
        page: 1,
        per_page: "all",
        busca: this.busca || ""
      });

      this.listaSetores = apiSetores.data.data || [];
    }
  }
};
</script>

<style scope>
.card,
.card-body {
  border: none;
}
</style>
