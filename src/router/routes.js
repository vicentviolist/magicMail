const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "login" */ 'layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/VendedorLogin.vue'),
      },
      {
        path: 'contrato',
        name: 'contrato',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/Contrato.vue'),
      },
      {
        path: 'terminos',
        name: 'terminos',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/TerminosCondiciones.vue'),
      },
      {
        path: 'registro-vendedor',
        name: 'registroventas',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/VentasRegistro.vue'),
      },
      {
        path: 'registro-tienda',
        name: 'registroTienda',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/TiendaRegistro.vue'),
      },
      {
        path: 'admin',
        name: 'loginAdmin',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/AdminLogin.vue'),
      },
      {
        path: 'forgotPassword',
        name: 'forgotPassword',
        component: () =>
          import(/* webpackChunkName: "forgot" */ 'pages/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/administrador',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ 'layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ 'pages/Dashboard/MainBoard.vue'
          ),
        children: [
          {
            path: 'home-admi',
            name: 'admi',
            component: () =>
              import(
                /* webpackChunkName: "bulk" */ 'pages/Dashboard/Admi/HomeAdministrador.vue'
              ),
          },
          {
            path: 'usuarios-clientes',
            name: 'usuariosClintes',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Admi/UsuariosClientes.vue'
              ),
          },
          {
            path: 'usuarios-juguetes',
            name: 'usuariosJuguetes',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Admi/UsuariosJuguetes.vue'
              ),
          },
          {
            path: 'reporte-pedidos',
            name: 'reportePedidos',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Admi/ReportePedidos.vue'
              ),
          },
          {
            path: 'reporte-pagos',
            name: 'reportePagos',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Admi/ReportePago.vue'
              ),
          },
        ],
        meta: {
          requiresAuth: false,
        },
      },
    ],
    meta: {
      requiresAuth: true,
      onlyAdmin: true,
    },
  },
  {
    path: '/vendedor',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ 'layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ 'pages/Dashboard/MainBoard.vue'
          ),
        children: [
          {
            path: 'home-vendedor',
            name: 'vendedor',
            component: () =>
              import(
                /* webpackChunkName: "bulk" */ 'pages/Dashboard/Vendedores/HomeVendedor.vue'
              ),
          },
          {
            path: 'inventario',
            name: 'inventario',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Vendedores/Inventario.vue'
              ),
          },
          {
            path: 'pedidos',
            name: 'pedidos',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Vendedores/Pedidos.vue'
              ),
          },
          {
            path: 'user',
            name: 'user',
            component: () =>
              import(
                /* webpackChunkName: "Usuarios Clientes" */ 'pages/Dashboard/Vendedores/Perfil.vue'
              ),
          },
        ],
      },
    ],
    meta: {
      requiresAuth: true,
      onlyAdmin: false,
    },
  },
];

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
