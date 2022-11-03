import { useUsersStore } from '~/stores/users'
export default defineNuxtRouteMiddleware((to, from) => {
  const usersStore = useUsersStore();
  if (!usersStore.state.me && to.path === '/signup') {
    return;
  }
  else if (!usersStore.state.me &&to.path !== '/intro') {
    // route반환
    return '/intro';
  }
});