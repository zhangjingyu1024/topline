<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 绘制登录form表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
              <img src="./logo_index.png" alt="">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"><i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyi">
          <!-- 复选框，单个复选框直接设置v-model即可，接收true/false的信息，表示是否选中 -->
          <el-checkbox v-model="loginForm.xieyi" ></el-checkbox>
          <span>
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%;" @click="login()" :disabled="isloading" :loading="isloading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入极验gt.js文件
import './gt.js'
export default {
  name: '',
  data () {
    var xieyiTest = function (rule, value, next) {
      // rule 校验规则,一般无用
      // value 被校验的数据
      // next 回调函数,校验成功或失败都会执行
      value ? next() : next(new Error('请遵守协议'))
    }
    return {
      // 表单对象
      loginForm: {
        mobile: '13835834435',
        code: '246810',
        xieyi: false
      },
      loginFormRules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }],
        code: [{ required: true, message: '请输入验证码' }, { len: 6, message: '验证码为6位' }],
        xieyi: [{ validator: xieyiTest, message: '请遵守协议' }]
      },
      isloading: false,
      capObj: null
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(v => {
        if (!v) { return false }
        if (this.capObj !== null) {
          // 如果极验窗口对象存在,就直接使用
          return this.capObj.verify()
        }
        this.isloading = true
        // A.人机验证
        // axios 获取极验的秘钥信息
        let pro = this.$http({
          url: '/mp/v1_0/captchas/' + this.loginForm.mobile
        })
        pro
          .then(result => {
            console.log(result) // 极验的秘钥信息
            // 从result里边结构下述的data对象出来(对象解构赋值)
            let { data } = result.data
            window.initGeetest({
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: 'bind'
            }, (cap) => {
              // 这里可以调用验证实例captchObj的实例方法
              cap.onReady(() => {
                cap.verify()
                this.isloading = false
                this.capObj = cap
              }).onSuccess(() => {
                this.loginAct()
              }).onError(() => {
                // 行为校验错误的处理
              })
            })
          }).catch(err => {
            return this.$message.error('获取极验秘钥失败' + err)
          })
        //
      })
    },
    // 账号验证
    loginAct () {
      // 服务端账号真实性校验
      let pro = this.$http({
        url: '/mp/v1_0/authorizations',
        method: 'post',
        data: this.loginForm
      })
      pro.then(res => {
        this.$message.success('登录成功！')
        setTimeout(() => {
          // 把服务端返回的秘钥等相关信息通过sessionStorage做记录,表明是登录状态
          window.sessionStorage.setItem('userinfo', JSON.stringify(res.data.data))
          this.$router.push('./home')
        }, 1000)
      }).catch(() => {
        this.$message.error('手机号或者验证码错误')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url(./login_bg.jpg);
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 410px;
    height: 340px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 80%;
      text-align: center;
      img{
        width: 60%;
      }
    }
  }
}
</style>
