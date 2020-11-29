<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 100vh;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-3 text-white">Olá {{ dadosLogin.name }}</h1>
              <p class="text-white mt-0 mb-5">
                Aqui você poderá administrar contatos, setores e ramais.
              </p>
              <!-- <a href="#!" class="btn btn-info">Edit profile</a> -->
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dadosLogin: JSON.parse(localStorage.getItem("user"))
    };
  }
};
</script>

<style></style>
