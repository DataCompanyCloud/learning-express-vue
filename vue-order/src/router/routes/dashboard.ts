import { RouteRecordRaw } from "vue-router";
import DefinedRoutes from "../defined-routes";

export const DashboardRoutes: RouteRecordRaw[] = [
  {
    name: DefinedRoutes.MyOrders,
    path: '/my-orders',
    component: () => import('../../pages/MyOrders.vue')
  },
  {
    name: DefinedRoutes.CreateOrder,
    path: '/create-order',
    component: () => import('../../pages/CreateOrder.vue')
  }
]