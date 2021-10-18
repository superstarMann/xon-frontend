/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateShareMusleInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createShareMusle
// ====================================================

export interface createShareMusle_createShareMusle {
  __typename: "CreateShareMusleOutput";
  ok: boolean;
  error: string | null;
  shareMusleId: number;
}

export interface createShareMusle {
  createShareMusle: createShareMusle_createShareMusle;
}

export interface createShareMusleVariables {
  input: CreateShareMusleInput;
}
