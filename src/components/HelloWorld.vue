<template >
  <div>
  <el-row style="height: 600px;margin: 0 auto">
    <el-col :span="8"><div class="grid-content bg-purple-r"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-dark">
      <table style="width: 400px; height: 300px;" align="center">
        <tr style="height: 70px"><td style="color: deepskyblue " valign="bottom">
          <font size="5"><strong>会议室预约系统登录</strong></font></td></tr>
        <tr style="height: 150px"><td><table align="center"><tr style="height: 70px">
          <td valign="bottom"><el-input style="width:170px" placeholder="请输入登录平台账号" v-model="username"></el-input></td>
        </tr>
        <tr style="height: 50px">
          <td valign="top"><el-input style="width:170px" placeholder="请输入登录平台密码" v-model="password" show-password></el-input></td>
        </tr>
        <tr><td><el-radio v-model="radio" label="1">用户登录</el-radio>
          <el-radio v-model="radio" label="2">管理员登录</el-radio></td></tr>
        </table></td></tr>
        <tr><td><el-button type="primary" @click="login">登录</el-button></td></tr>
      </table>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-r"></div></el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      radio: '1',
      username: 'shenxl',
      password: 'asd',
      user: {
        username: null,
        password: null,
        name: null,
        email: null,
        guan: null
      }
    }
  },
  methods: {
    /* 获取全部数据 */
    login () {
      if (!this.username) {
        this.$message({
          message: '请输入账号！',
          center: true
        })
      } else if (!this.password) {
        this.$message({
          message: '请输入密码！',
          center: true
        })
      } else {
        this.$axios({
          method: 'post',
          url: '/login',
          data: this.username
        }).then((response) => {
          this.user = response.data
          if (this.user.password === this.password) {
            if (this.radio === '2') {
              if (this.user.guan === 'n') {
                this.$message.error({
                  message: '你不是管理员，请用管理员账号登录！',
                  center: true
                })
              } else {
                this.$message({
                  message: '管理员登录成功！',
                  center: true,
                  type: 'success'
                })
                this.$router.push({name: 'hysyy', params: {name: this.user.name}})
              }
            } else {
              this.$message({
                message: '登录成功！',
                center: true,
                type: 'success'
              })
              this.$router.push({name: 'hysyy', params: {name: this.user.name}})
            }
          } else {
            this.$message.error({
              message: '账号或密码错误！',
              center: true
            })
          }
        })
      }
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 10px;
  }
  .bg-purple-dark {
    background: #C0C0C0;
  }
  .bg-purple-r {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 10px;
    min-height: 36px;
  }
</style>
