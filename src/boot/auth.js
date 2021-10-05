import Parse from 'parse';
export default async ({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    try {  
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (to.matched.some((record) => record.meta.onlyAdmin)){
          console.log('role', store.state.auth.role);
          if (store.state.auth.role == 'administrador'){
            next();
          } else {
            next({ name: 'login' });
          }
        } else {
          if (store.state.auth.role == 'vendedor'){
            next();
          } else {
            next({ name: 'login' });
          }
        }
      } else {
        next();
      }
    } catch (e) {
      // handle get/me api response when response is different from 200(sucessfull)
        next({ name: 'login' });
    } 
  });
};
