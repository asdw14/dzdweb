import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d6768a88 = () => interopDefault(import('..\\pages\\course\\index.vue' /* webpackChunkName: "pages_course_index" */))
const _1a67f564 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _4a6e68ce = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _6cb6909b = () => interopDefault(import('..\\pages\\teacher\\index.vue' /* webpackChunkName: "pages_teacher_index" */))
const _1a7a3c24 = () => interopDefault(import('..\\pages\\course\\_id.vue' /* webpackChunkName: "pages_course__id" */))
const _1e6a35db = () => interopDefault(import('..\\pages\\orders\\_oid.vue' /* webpackChunkName: "pages_orders__oid" */))
const _79ae68d9 = () => interopDefault(import('..\\pages\\pay\\_pid.vue' /* webpackChunkName: "pages_pay__pid" */))
const _5adc419e = () => interopDefault(import('..\\pages\\player\\_vid.vue' /* webpackChunkName: "pages_player__vid" */))
const _7a55fdc3 = () => interopDefault(import('..\\pages\\teacher\\_id.vue' /* webpackChunkName: "pages_teacher__id" */))
const _29246237 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/course",
    component: _d6768a88,
    name: "course"
  }, {
    path: "/login",
    component: _1a67f564,
    name: "login"
  }, {
    path: "/register",
    component: _4a6e68ce,
    name: "register"
  }, {
    path: "/teacher",
    component: _6cb6909b,
    name: "teacher"
  }, {
    path: "/course/:id",
    component: _1a7a3c24,
    name: "course-id"
  }, {
    path: "/orders/:oid?",
    component: _1e6a35db,
    name: "orders-oid"
  }, {
    path: "/pay/:pid?",
    component: _79ae68d9,
    name: "pay-pid"
  }, {
    path: "/player/:vid?",
    component: _5adc419e,
    name: "player-vid"
  }, {
    path: "/teacher/:id",
    component: _7a55fdc3,
    name: "teacher-id"
  }, {
    path: "/",
    component: _29246237,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
