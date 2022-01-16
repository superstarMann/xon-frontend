/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchShareMusleInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchShareMusles
// ====================================================

export interface searchShareMusles_searchShareMusle_shareMusles_country {
  __typename: "Country";
  name: string;
}

export interface searchShareMusles_searchShareMusle_shareMusles {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: searchShareMusles_searchShareMusle_shareMusles_country | null;
  isPromoted: boolean;
}

export interface searchShareMusles_searchShareMusle {
  __typename: "SearchShareMusleOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  shareMusles: searchShareMusles_searchShareMusle_shareMusles[] | null;
}

export interface searchShareMusles {
  searchShareMusle: searchShareMusles_searchShareMusle;
}

export interface searchShareMuslesVariables {
  input: SearchShareMusleInput;
}
