/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CountryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: countryQuery
// ====================================================

export interface countryQuery_country_shareMusles_country {
  __typename: "Country";
  name: string;
}

export interface countryQuery_country_shareMusles {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: countryQuery_country_shareMusles_country | null;
  isPromoted: boolean;
}

export interface countryQuery_country_country {
  __typename: "Country";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  shareMusleCount: number;
}

export interface countryQuery_country {
  __typename: "CountryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  shareMusles: countryQuery_country_shareMusles[] | null;
  country: countryQuery_country_country | null;
}

export interface countryQuery {
  country: countryQuery_country;
}

export interface countryQueryVariables {
  input: CountryInput;
}
