<template>
  <div>
    
  </div>
</template>
<script>
export default {
  name: 'HashTagView',
  components: {},
  directives: {},
  provide() {
    return {
    }
  },
  inject() {
    return {
    }
  },
  props: {},
  setup() {
    const { $trigger } = useNuxtApp();
    onMounted(() => {
      $trigger('endLoading');
    })
  },
}
</script>
