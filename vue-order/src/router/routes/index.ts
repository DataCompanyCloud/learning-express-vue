import { RouteRecordRaw } from "vue-router";
import { DashboardRoutes } from "./dashboard";
import * as Middleware from "../middleware";
import DefinedRoutes from "../defined-routes";

export const routes: RouteRecordRaw[] = [
  {
    name: DefinedRoutes.Login,
    path: '/login',
    beforeEnter: Middleware.alreadyLoggedIn,
    component: () => import('../../pages/Login.vue')
  },
  {
    name: DefinedRoutes.Dashboard,
    path: '',
    redirect: { name: DefinedRoutes.MyOrders },
    component: () => import('../../layouts/Dashboard.vue'),
    beforeEnter: Middleware.onlyAuthenticated,
    children: DashboardRoutes
  },
]