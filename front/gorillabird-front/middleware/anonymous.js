import { useUsersStore } from '~/stores/users'
export default defineNuxtRouteMiddleware((to, from) => {
  const usersStore = useUsersStore();
  if (usersStore.state.me) {
    return '/';
  }
});