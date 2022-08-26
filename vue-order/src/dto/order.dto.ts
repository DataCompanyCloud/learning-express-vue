import { OrderItem } from "../types/OrderItem";

export interface OrderDTO {
  status: string,
  data: OrderItem[]
}