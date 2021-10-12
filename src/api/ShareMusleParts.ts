/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShareMusleParts
// ====================================================

export interface ShareMusleParts_country {
  __typename: "Country";
  name: string;
}

export interface ShareMusleParts {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: ShareMusleParts_country | null;
  isPromoted: boolean;
}
