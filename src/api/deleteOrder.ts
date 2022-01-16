/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteOrder
// ====================================================

export interface deleteOrder_deleteOrder {
  __typename: "DeleteOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteOrder {
  deleteOrder: deleteOrder_deleteOrder;
}

export interface deleteOrderVariables {
  input: DeleteOrderInput;
}
