<template>
  <div style="width:600px; height: 500px;margin: 0 auto">
    <div style="height: 70px"><h4>预约申请</h4></div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="预约人">
        <el-input v-model="ruleForm.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="会议室">
        <el-select v-model="ruleForm.region" placeholder="请选择会议室">
          <el-option label="1019室" value="1019"></el-option>
          <el-option label="1021室" value="1021"></el-option>
          <el-option label="1513室" value="1513"></el-option>
          <el-option label="1523室" value="1523"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="选择日期" format="yyyy 年 MM 月 dd 日 HH 时" value-format="yyyyMMddHH" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="10"><p style="font-family:verdana;font-size:40%;color:#7c7f80">(只支持整点(8-12，14-18)，会议时间为一小时，如需更长时间可连续预约)</p></el-col>
      </el-form-item>
      <el-form-item label="会议内容" prop="name">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即申请</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'yysq',
  data () {
    return {
      ruleForm: {
        name: this.$route.params.name,
        region: null,
        date1: null,
        desc: null
      },
      yuYue: {
        name: null,
        room: null,
        datetime: null,
        neirong: null
      },
      s: 0,
      list: []
    }
  },
  methods: {
    getDay () {
      let today = new Date()
      let oYear = today.getFullYear()
      let oMoth = (today.getMonth() + 1).toString()
      if (oMoth.length <= 1) oMoth = '0' + oMoth
      let oDay = today.getDate().toString()
      if (oDay.length <= 1) oDay = '0' + oDay
      return oYear + oMoth + oDay
    },
    resetForm () {
      this.ruleForm.region = null
      this.ruleForm.date1 = null
      this.ruleForm.date2 = null
      this.ruleForm.desc = null
    },
    submitForm () {
      if (!this.ruleForm.region) {
        this.$message({
          message: '请选择会议室！',
          center: true
        })
      } else if (!this.ruleForm.date1) {
        this.$message({
          message: '请选择日期！',
          center: true
        })
      } else if (!this.ruleForm.desc) {
        this.$message({
          message: '请填写会议内容！',
          center: true
        })
      } else {
        let a = parseInt(this.ruleForm.date1)
        let b = parseInt(this.getDay())
        if (((b + 1) * 100) >= a) {
          this.$message.error({
            message: '日期必须大于今天！',
            center: true
          })
        } else {
          this.yuYue.name = this.ruleForm.name
          this.yuYue.room = this.ruleForm.region
          this.yuYue.datetime = this.ruleForm.date1
          this.yuYue.neirong = this.ruleForm.desc
          this.$axios({
            method: 'post',
            url: '/yuYue',
            data: this.yuYue
          }).then((response) => {
            if (response.data === 0) {
              this.$confirm('预约成功！', '提示', {
                confirmButtonText: '确定'
              })
            } else if (response.data === 1) {
              this.$confirm('预约冲突，该会议室已被预约！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
            } else if (response.data === 2) {
              this.$confirm('预约冲突，您已有其他预约！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
            }
            this.resetForm()
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
