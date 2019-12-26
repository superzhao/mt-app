<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <imenu />
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Imenu from "@/components/index/menu";
import Life from "@/components/index/life";
import Artistic from "@/components/index/artistic";
export default {
  components: {
    Logo,
    Imenu,
    Life,
    Artistic
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
