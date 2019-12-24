
<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar></top-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar></search-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from "./topBar.vue";
import SearchBar from "./searchBar.vue";
export default {
  components: { TopBar, SearchBar }
};
</script>

<style lang="scss" scoped>
 @import "@/assets/css/public/header/index.scss";
</style>