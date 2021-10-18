/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShareMusleInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myshareMusle
// ====================================================

export interface myshareMusle_shareMusle_shareMusle_country {
  __typename: "Country";
  name: string;
}

export interface myshareMusle_shareMusle_shareMusle {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: myshareMusle_shareMusle_shareMusle_country | null;
  isPromoted: boolean;
}

export interface myshareMusle_shareMusle {
  __typename: "ShareMusleOutput";
  ok: boolean;
  error: string | null;
  shareMusle: myshareMusle_shareMusle_shareMusle | null;
}

export interface myshareMusle {
  shareMusle: myshareMusle_shareMusle;
}

export interface myshareMusleVariables {
  input: ShareMusleInput;
}
