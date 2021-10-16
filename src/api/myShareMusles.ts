/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myShareMusles
// ====================================================

export interface myShareMusles_myShareMusles_shareMusles_country {
  __typename: "Country";
  name: string;
}

export interface myShareMusles_myShareMusles_shareMusles {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: myShareMusles_myShareMusles_shareMusles_country | null;
  isPromoted: boolean;
}

export interface myShareMusles_myShareMusles {
  __typename: "MyShareMuslesOutput";
  ok: boolean;
  error: string | null;
  shareMusles: myShareMusles_myShareMusles_shareMusles[];
}

export interface myShareMusles {
  myShareMusles: myShareMusles_myShareMusles;
}
