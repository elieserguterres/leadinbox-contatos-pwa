import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Layout/AuthLayout.vue";
import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          requiresAuth: true,
          title: "Dashboard - Admin",
          h1: "Dashboard"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Dashboard.vue")
      },

      /** contatos */
      {
        path: "/contatos", // listagem
        name: "contatos",
        meta: {
          requiresAuth: true,
          title: "Contatos - Admin",
          h1: "Contatos"
        },
        component: () => import("../views/Pages/Contatos/ContatoTable.vue")
      },
      /** /contatos */

      /** setores */
      {
        path: "/setores", // listagem
        name: "setores",
        meta: {
          requiresAuth: true,
          title: "Setores - Admin",
          h1: "Setores"
        },
        component: () => import("../views/Pages/Setores/SetorTable.vue")
      }
      /** /setores */
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,

    children: [
      {
        path: "/login",
        name: "login",

        meta: {
          guest: true,
          title: "Login - Admin",
          h1: "Login"
          // metaTags: [
          //   {
          //     name: "description",
          //     content: "The home page of our example app."
          //   },
          //   {
          //     property: "og:description",
          //     content: "The home page of our example app."
          //   }
          // ]
        },
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/Login/Login.vue"
          )
      },

      { path: "*", component: NotFound }
    ]
  }
];

export default routes;
