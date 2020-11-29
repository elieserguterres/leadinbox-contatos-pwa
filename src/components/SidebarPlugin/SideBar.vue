<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-xl navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar"> </navbar-toggle-button>

      <router-link class="navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img" alt="..." />
        <!-- <h2></h2> -->
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-lg-none">
          <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a slot="title-container" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-1.jpg" />
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">bem-vindo!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Meus Dados</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-key-25"></i>
              <span>Alterar Senha</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Sair</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-lg-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
        <!--Heading-->
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/leadinbox-preto-471x135.png",
      description: "Leadinbox App"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  data() {
    return {
      displaySidebar: false
    };
  },
  methods: {
    closeSidebar() {
      this.displaySidebar = false;
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.displaySidebar = !this.displaySidebar;
      this.$sidebar.displaySidebar(this.displaySidebar);
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
    this.displaySidebar = false;
  }
};
</script>

<style scoped>
.navbar-vertical .navbar-brand-img,
.navbar-vertical .navbar-brand > img {
  max-height: 3.2rem;
}

a:hover {
  text-decoration: none;
}
</style>
