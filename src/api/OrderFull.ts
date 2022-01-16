/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderFull
// ====================================================

export interface OrderFull_driver {
  __typename: "User";
  email: string;
}

export interface OrderFull_customer {
  __typename: "User";
  email: string;
}

export interface OrderFull_shareMusle {
  __typename: "ShareMusle";
  name: string;
}

export interface OrderFull {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: OrderFull_driver | null;
  customer: OrderFull_customer | null;
  shareMusle: OrderFull_shareMusle | null;
}
