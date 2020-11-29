<template>
  <div>
    <!-- Header -->
    <div class="header bg-white py-7">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="6" lg="6" md="8" class="px-5">
              <!-- <h1 class="text-white">Bem-vindo!</h1>
              <p class="text-lead text-white">
                Controle de clientes e pedidos de Cláudia Santos Jóias.
              </p> -->
              <!-- <img  class="navbar-brand-img" alt="..." /> -->
              <b-img
                :src="logo"
                fluid
                class="navbar-brand-img"
                alt="Agenda"
              ></b-img>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-light border-0 mb-0">
            <b-overlay
              :show="overlay"
              rounded="sm"
              spinner-variant="primary"
              spinner-type="grow"
            >
              <b-card-body class="px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Informe seu email e senha de acesso ao sistema</small>
                </div>

                <base-alert v-if="this.errorsLogin" type="danger">{{
                  errorsLogin
                }}</base-alert>

                <validation-observer
                  v-slot="{ handleSubmit }"
                  ref="formValidator"
                >
                  <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <base-input
                      alternative
                      class="mb-3"
                      name="Email"
                      :rules="{ required: true, email: true }"
                      prepend-icon="ni ni-email-83"
                      placeholder="E-mail"
                      v-model="model.email"
                    >
                    </base-input>

                    <base-input
                      alternative
                      class="mb-3"
                      name="Password"
                      :rules="{ required: true, min: 3 }"
                      prepend-icon="ni ni-lock-circle-open"
                      type="password"
                      placeholder="Password"
                      v-model="model.password"
                    >
                    </base-input>

                    <!--
                  <b-form-checkbox v-model="model.rememberMe"
                    >Remember me</b-form-checkbox
                  >
                  -->

                    <div class="text-center">
                      <base-button
                        type="primary"
                        native-type="submit"
                        class="my-4"
                        >Entrar</base-button
                      >
                    </div>
                  </b-form>
                </validation-observer>
              </b-card-body>
            </b-overlay>
          </b-card>

          <!--
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </b-col>
          </b-row>
          -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import api from "../../../api/api";
import BaseAlert from "../../../components/BaseAlert.vue";

export default {
  components: { BaseAlert },
  props: {
    logo: {
      type: String,
      default: "img/brand/leadinbox-preto-471x135.png",
      description: "Leadinbox App"
    }
  },
  data() {
    return {
      overlay: false,
      model: {
        email: "",
        password: "",
        rememberMe: false
      },
      errorsLogin: ""
    };
  },
  methods: {
    async onSubmit() {
      this.errorsLogin = "";
      this.overlay = true;

      const loginData = await api.login({
        email: this.model.email,
        password: this.model.password
      });

      if (loginData.status == "ok") {
        localStorage.setItem("token", loginData.data._token);

        const dadosLogin = await api.dadosLogin();
        localStorage.setItem("user", JSON.stringify(dadosLogin.data));

        this.$router.push("/");
      }

      if (loginData.status == "error") {
        this.errorsLogin = loginData.errors.join(" - ");
      }

      this.overlay = false;
    }
  },
  created() {}
};
</script>

<style scoped></style>
