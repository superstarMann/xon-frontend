import gql from "graphql-tag";

export const SHAREMUSLE_FRAGMENT = gql`
 fragment ShareMusleParts on ShareMusle {
    id
    name
    address
    coverImg
    country{
        name
    }
    isPromoted
 }
`

export const COUNTRY_FRAGMENT = gql`
 fragment CountryParts on Country{
     id
     name
     coverImg
     slug
     shareMusleCount
 }
`;

export const DISH_FRAGMENT = gql`
 fragment DishParts on Dish{
     id
     name
     price
     photo
     description
     options{
         name
         extra
         choices{
             name
             extra
         }
     }
 }
`

export const ORDER_FRAGMENT = gql`
 fragment OrderParts on Order{
     id
     total
     createdAt
 }
`

export const ORDER_FULL_FRAGMENT = gql`
 fragment OrderFull on Order{
    id
    status
    total
    driver{
        email
    }
    customer{
        email
    }
    shareMusle{
        name
    }
 }
`