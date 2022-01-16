/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyShareMusleInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myShareMusle
// ====================================================

export interface myShareMusle_myShareMusle_shareMusle_country {
  __typename: "Country";
  name: string;
}

export interface myShareMusle_myShareMusle_shareMusle_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface myShareMusle_myShareMusle_shareMusle_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: myShareMusle_myShareMusle_shareMusle_menu_options_choices[] | null;
}

export interface myShareMusle_myShareMusle_shareMusle_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myShareMusle_myShareMusle_shareMusle_menu_options[] | null;
}

export interface myShareMusle_myShareMusle_shareMusle_orders {
  __typename: "Order";
  id: number;
  total: number | null;
  createdAt: any;
}

export interface myShareMusle_myShareMusle_shareMusle {
  __typename: "ShareMusle";
  id: number;
  name: string;
  address: string;
  coverImg: string;
  country: myShareMusle_myShareMusle_shareMusle_country | null;
  isPromoted: boolean;
  menu: myShareMusle_myShareMusle_shareMusle_menu[];
  orders: myShareMusle_myShareMusle_shareMusle_orders[];
}

export interface myShareMusle_myShareMusle {
  __typename: "MyShareMusleOutput";
  ok: boolean;
  error: string | null;
  shareMusle: myShareMusle_myShareMusle_shareMusle | null;
}

export interface myShareMusle {
  myShareMusle: myShareMusle_myShareMusle;
}

export interface myShareMusleVariables {
  input: MyShareMusleInput;
}
