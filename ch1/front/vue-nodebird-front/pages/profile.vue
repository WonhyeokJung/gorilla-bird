<template>
  <div>
    {{ data }} page
  </div>
</template>
<script>
definePageMeta({
  layout: 'admin',
});
export default {
  setup() {
    const data = 'profile';
    // Nuxt function : <head></head> settings
    useHead({
      title: 'Profile'
    });

    return {
      data
    }
  },
}
</script>