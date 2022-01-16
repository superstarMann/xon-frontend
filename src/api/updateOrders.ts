/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: updateOrders
// ====================================================

export interface updateOrders_updateOrders_driver {
  __typename: "User";
  email: string;
}

export interface updateOrders_updateOrders_customer {
  __typename: "User";
  email: string;
}

export interface updateOrders_updateOrders_shareMusle {
  __typename: "ShareMusle";
  name: string;
}

export interface updateOrders_updateOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: updateOrders_updateOrders_driver | null;
  customer: updateOrders_updateOrders_customer | null;
  shareMusle: updateOrders_updateOrders_shareMusle | null;
}

export interface updateOrders {
  updateOrders: updateOrders_updateOrders;
}

export interface updateOrdersVariables {
  input: UpdateOrderInput;
}
