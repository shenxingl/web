import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hysyy from '@/components/hysyy'
import yycx from '@/components/modules/yycx'
import yysq from '@/components/modules/yysq'
import grzx from '@/components/modules/grzx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: 'hysyy',
      name: 'hysyy',
      component: hysyy,
      children: [
        {
          path: 'yycx',
          name: 'yycx',
          component: yycx
        },
        {
          path: 'yysq',
          name: 'yysq',
          component: yysq
        },
        {
          path: 'grzx',
          name: 'grzx',
          component: grzx
        }
      ]
    }
  ]
})
