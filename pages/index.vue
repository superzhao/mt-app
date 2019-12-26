<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <imenu />
      </el-col>
      <el-col :span="19">2</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">3</el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Imenu from "@/components/index/menu";
export default {
  components: {
    Logo,
    Imenu
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
