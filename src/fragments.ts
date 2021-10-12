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