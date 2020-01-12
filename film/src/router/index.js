import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Vueaxios from 'vue-axios'

import movieList from '../pages/moviesList'
import MovieDetail from '../pages/movieDetail'
import NewsDetail from '../pages/newsDetail'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'
import Findpassword from '../pages/findPassword'
import UserInfo from '../pages/userInfo'
import SendEmail from '../pages/sendEmail'

Vue.use(Router)
Vue.use(Vueaxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'resolve',
      component: resolve => require(['../pages/index'], resolve),
      meta: {
        title: 'home'
      }
    },
    {
      path: '/movieList',
      component: movieList
    },
    {
      path: '/movieDetail',
      component: MovieDetail
    },
    {
      path: '/newDetail',
      component: NewsDetail
    },
    {
      path: '/loginPage',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/findpassword',
      component: Findpassword
    },
    {
      path: '/userinfo',
      component: UserInfo
    },
    {
      path: '/sendemail',
      component: SendEmail
    }
  ]
})
