<template>
  <div style="width:1000px; height: 600px;margin: 0 auto">
    <el-container>
      <el-header style="height: 86px">
        <table><tr>
          <td width="230px">
            <p style="color: white; font-size: 20px;"><strong>会议室预约系统</strong></p></td>
          <td width="530px">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#B3C0D1"
                     text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="1" @click="yycx">预约查询</el-menu-item>
              <el-menu-item index="2" @click="yysq">预约申请</el-menu-item>
              <el-menu-item index="3" @click="grzx">个人中心</el-menu-item>
            </el-menu>
          </td>
          <td>
            <p style="font-size:6px;">当前登录：{{name}}&#8194;&#8194;&#8194;<a href="HelloWorld.vue">注销</a></p>
          </td>
        </tr></table>
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'hysyy',
  data () {
    return {
      activeIndex: '1',
      name: null
    }
  },
  /* 初始化执行方法 */
  created: function () {
    this.name = this.$route.params.name
    this.$router.push({name: 'yycx', params: {name: this.name}})
  },
  methods: {
    yycx () {
      this.$router.push({name: 'yycx', params: {name: this.name}})
    },
    yysq () {
      this.$router.push({name: 'yysq', params: {name: this.name}})
    },
    grzx () {
      this.$router.push({name: 'grzx', params: {name: this.name}})
    }
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: rgba(99, 165, 153, 0.26);
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
