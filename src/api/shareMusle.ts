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

export interface shareMusle_shareMusle_shareMusle_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface shareMusle_shareMusle_shareMusle_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: shareMusle_shareMusle_shareMusle_menu_options_choices[] | null;
}

export interface shareMusle_shareMusle_shareMusle_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: shareMusle_shareMusle_shareMusle_menu_options[] | null;
}

export interface shareMusle_shareMusle_shareMusle {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: shareMusle_shareMusle_shareMusle_country | null;
  isPromoted: boolean;
  menu: shareMusle_shareMusle_shareMusle_menu[];
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
