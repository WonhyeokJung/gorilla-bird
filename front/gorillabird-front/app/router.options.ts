import { RouterConfig } from '@nuxt/schema';
// vue-router options로 페이지 위치 기억하기
export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition && process.client) {
      console.log(savedPosition.top)
      window.scrollTo(0, savedPosition.top)
      return savedPosition;
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  },
};