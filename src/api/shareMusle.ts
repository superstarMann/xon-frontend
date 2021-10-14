/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShareMusleInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: shareMusle
// ====================================================

export interface shareMusle_shareMusle_shareMusle_country {
  __typename: "Country";
  name: string;
}

export interface shareMusle_shareMusle_shareMusle {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: shareMusle_shareMusle_shareMusle_country | null;
  isPromoted: boolean;
}

export interface shareMusle_shareMusle {
  __typename: "ShareMusleOutput";
  ok: boolean;
  error: string | null;
  shareMusle: shareMusle_shareMusle_shareMusle | null;
}

export interface shareMusle {
  shareMusle: shareMusle_shareMusle;
}

export interface shareMusleVariables {
  input: ShareMusleInput;
}
