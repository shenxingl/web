<template>
  <div style="width:530px; height: 500px;margin: 0 auto">
    <br>
    <el-card style="height: 350px; width: 520px" class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: right; padding: 3px 0" @click="v=true" type="text">修改密码</el-button>
        <table>
          <tr style="height: 60px">
            <td width="100px" ><p style="font-family:verdana;font-size:80%;color:green"><strong>姓名</strong></p></td>
            <td width="50px" align="left">：</td><td><p style="font-family:verdana;font-size:80%;">{{user.name}}</p></td></tr>
          <tr style="height: 60px">
            <td width="100px"><p style="font-family:verdana;font-size:80%;color:green"><strong>账户</strong></p></td>
            <td width="50px" align="left">：</td><td><p style="font-family:verdana;font-size:80%;">{{user.username}}</p></td></tr>
          <tr style="height: 60px">
            <td width="100px"><p style="font-family:verdana;font-size:80%;color:green"><strong>密码</strong></p></td>
            <td width="50px" align="left">：</td><td><p style="font-family:verdana;font-size:80%;">********</p></td></tr>
          <tr style="height: 60px">
            <td width="100px"><p style="font-family:verdana;font-size:80%;color:green"><strong>邮箱</strong></p></td>
            <td width="50px" align="left">：</td><td><p style="font-family:verdana;font-size:80%;">{{user.email}}</p></td></tr>
          <tr style="height: 60px">
            <td width="100px"><p style="font-family:verdana;font-size:80%;color:green"><strong>开启提醒</strong></p></td>
            <td width="50px" align="left">：</td>
            <td><el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td></tr>
        </table>
      </div>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog title="修改密码" :visible.sync ="v">
      <el-input style="width:210px" placeholder="请输入原始密码" v-model="oldpass"></el-input><br>
      <el-input style="width:210px" placeholder="请输入新密码" v-model="pass"></el-input><br><br>
      <el-button @click="oldpass=null;pass = null; v = false">取 消</el-button>
      <el-button type="primary" @click="change">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'grzx',
  data () {
    return {
      value: false,
      v: false,
      name: null,
      oldpass: null,
      pass: null,
      user: {
        username: null,
        password: null,
        name: null,
        email: null
      }
    }
  },
  created: function () {
    this.name = this.$route.params.name
    this.getName()
  },
  methods: {
    getName () {
      this.$axios({
        method: 'post',
        url: '/getName',
        data: this.name
      }).then((response) => {
        this.user = response.data
      })
    },
    change () {
      if (!this.oldpass) {
        this.$message.error({
          message: '请输入原始密码！',
          center: true
        })
      } else if (!this.pass) {
        this.$message.error({
          message: '请输入密码！',
          center: true
        })
      } else if (this.oldpass !== this.user.password) {
        this.$message.error({
          message: '密码错误！',
          center: true
        })
      } else {
        this.user.password = this.pass
        this.$axios({
          method: 'post',
          url: '/change',
          data: this.user
        }).then((response) => {
          this.$message({
            message: '修改成功！',
            center: true,
            type: 'success'
          })
          this.user = response.data
          this.v = false
          this.oldpass = null
          this.pass = null
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
