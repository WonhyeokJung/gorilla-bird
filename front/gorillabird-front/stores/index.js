export const useIndexStore = defineStore('index', () => {
  const count = ref(0);
  const increment = function() {
    count.value++;
  }
  const doubleCount = computed(() => count.value*2);
  return {
    count,
    increment,
    doubleCount
  }
});

/* <template>
<div @click="indexStore.increment">{{ indexStore.count }}, {{ indexStore.doubleCount }}</div>
</template>
<script setup>
  import { useIndexStore } from '@/stores/index.js';
  const indexStore = useIndexStore();
</script> */