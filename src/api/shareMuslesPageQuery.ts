/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShareMuslesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: shareMuslesPageQuery
// ====================================================

export interface shareMuslesPageQuery_allCountries_countries {
  __typename: "Country";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  shareMusleCount: number;
}

export interface shareMuslesPageQuery_allCountries {
  __typename: "AllCountriesOutput";
  ok: boolean;
  error: string | null;
  countries: shareMuslesPageQuery_allCountries_countries[] | null;
}

export interface shareMuslesPageQuery_allShareMusle_results_country {
  __typename: "Country";
  name: string;
}

export interface shareMuslesPageQuery_allShareMusle_results {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: shareMuslesPageQuery_allShareMusle_results_country | null;
  isPromoted: boolean;
}

export interface shareMuslesPageQuery_allShareMusle {
  __typename: "ShareMuslesOutput";
  ok: boolean;
  error: string | null;
  totalResults: number | null;
  totalPages: number | null;
  results: shareMuslesPageQuery_allShareMusle_results[] | null;
}

export interface shareMuslesPageQuery {
  allCountries: shareMuslesPageQuery_allCountries;
  allShareMusle: shareMuslesPageQuery_allShareMusle;
}

export interface shareMuslesPageQueryVariables {
  input: ShareMuslesInput;
}
