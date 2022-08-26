import { RouteRecordRaw } from "vue-router";
import * as Middleware from "./middleware";

export enum DefinedRoutes {
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  MyOrders = 'MY_ORDERS',
  CreateOrder = 'CREATE_ORDER'
}

export const routes: RouteRecordRaw[] = [
  {
    name: DefinedRoutes.Login,
    path: '/login',
    beforeEnter: Middleware.alreadyLoggedIn,
    component: () => import('../pages/Login.vue')
  },
  {
    name: DefinedRoutes.Dashboard,
    path: '',
    redirect: DefinedRoutes.MyOrders,
    component: () => import('../layouts/Dashboard.vue'),
    beforeEnter: Middleware.onlyAuthenticated,
    children: [
      {
        name: DefinedRoutes.MyOrders,
        path: '/my-orders',
        component: () => import('../pages/MyOrders.vue')
      },
      {
        name: DefinedRoutes.CreateOrder,
        path: '/create-order',
        component: () => import('../pages/CreateOrder.vue')
      }
    ]
  },
]