<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hotCitis/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import hotCitis from '@/components/changeCity/hotCitis.vue'
import category from '@/components/changeCity/category.vue'
export default {
  components:{
    iSelect,
    hotCitis,
    category
  }
}
</script>

<style lang="css">
</style>
