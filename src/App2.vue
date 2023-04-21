<template>
  <div>
    <input v-model="searchTerm" placeholder="Search..." />
    <ul>
      <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  setup() {
    // 原始資料
    const items = reactive([
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Orange" },
      { id: 4, name: "Pineapple" },
      { id: 5, name: "Mango" },
      { id: 6, name: "Peach" },
      { id: 7, name: "Grapes" },
    ]);

    // 搜尋關鍵字
    const searchTerm = reactive("");

    // 計算過濾後的結果
    const filteredItems = computed(() => {
      return items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return {
      searchTerm,
      filteredItems,
    };
  },
};
</script>
