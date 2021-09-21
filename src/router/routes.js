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
            path: 'list',
            name: 'dashboard',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ 'pages/Dashboard/List/ListData.vue'
              ),
          },
          {
            path: 'bulk-load',
            name: 'bulkLoad',
            component: () =>
              import(
                /* webpackChunkName: "bulk" */ 'pages/Dashboard/Bulk/BulkLoad.vue'
              ),
          },
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
        ],
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/vendedor',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ 'layouts/DashboardLayoutVendedor.vue'),
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
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
];

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
