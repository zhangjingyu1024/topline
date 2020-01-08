<template>
  <el-container>
    <el-aside :style="{width:isCollapse?'65px':'200px'}">
      <el-menu
        background-color="#323745"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/home" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="{width:isCollapse?'65px':'200px'}">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <!-- el-menu组件可以使得本身的菜单项目具备声明式导航功能(类似router-link功能) -->
          <el-menu-item index="1">发布文章</el-menu-item>
          <el-menu-item index="/article">文章列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="4" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-setting"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i
            slot="prefix"
            :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
            style="cursor:pointer;"
            @click="isCollapse=!isCollapse"
          ></i>
          <span style="padding-left:10px">深圳腾讯计算机系统有限公司</span>
        </div>

        <div id="rt">
          <el-input type="text" placeholder="请输入搜索的文章内容" style="width:300px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span style="margin:0 10px; cursor: pointer">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt width="40" height="40" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579070723&di=72e69b5fcffe28b83610794d0f56ef7d&imgtype=jpg&er=1&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb3b7d0a20cf431ad2ac8f0784036acaf2edd985d.jpg
export default {
  data () {
    return {
      isCollapse: false // false:展开   true:折叠
    }
  },
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    photo () {
      let photo = (JSON.parse(window.sessionStorage.getItem('userinfo')).photo =
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579070723&di=72e69b5fcffe28b83610794d0f56ef7d&imgtype=jpg&er=1&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb3b7d0a20cf431ad2ac8f0784036acaf2edd985d.jpg')
      return photo
    }
  },
  methods: {
    logout () {
      // 确认
      this.$confirm('你要退吗?', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清空sessionStorage数据
          window.sessionStorage.clear()
          // 导航到登录页面
          this.$router.push({ name: 'login' })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: rgb(50, 55, 69);
    transition: all 0.1s;
  }
  .el-header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 9px;
    min-width: 950px;
    #lt {
      height: 100%;
      width: 40%;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: rgb(236, 10, 123);

      i:hover {
        background: lightblue;
        transform: scale(1.5);
        transition: all 0.1s;
      }
    }
    #rt {
      height: 100%;
      width: 50%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        img {
          border-radius: 50%;
          margin-right: 10px;
          cursor: pointer;
        }
        img:hover {
          transform: scale(2.5);
          transition: all 0.2s;
        }
      }
    }
  }
}
</style>
