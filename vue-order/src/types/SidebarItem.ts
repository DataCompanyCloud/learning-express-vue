import { ComputedRef } from "vue";

export interface SidebarItem {
  routeName: string,
  title: string,
  icon: string,
  isActive: ComputedRef<boolean>,
  handleClick: () => void,
}