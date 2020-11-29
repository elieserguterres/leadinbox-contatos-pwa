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
      </b-form>
    </b-overlay>
  </card>
</template>

<script>
import vSelect from "vue-select";
import { mask } from "vue-the-mask";

export default {
  directives: { mask },
  props: {
    errorMsg: "",
    inputData: {},
    overlay: false
  },
  data() {
    return {};
  }
};
</script>

<style scope>
.card,
.card-body {
  border: none;
}
</style>
