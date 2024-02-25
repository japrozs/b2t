import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type City = {
  __typename?: 'City';
  code: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  countryName: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  hotels: Array<Hotel>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Hotel = {
  __typename?: 'Hotel';
  body: Scalars['String']['output'];
  city: City;
  cityId: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  details: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCities: Array<City>;
  getCity: City;
};


export type QueryGetCityArgs = {
  code: Scalars['String']['input'];
};

export type RegularCityFragment = { __typename: 'City', id: number, code: string, name: string, countryName: string, countryCode: string, createdAt: string, updatedAt: string };

export type RegularHotelFragment = { __typename: 'Hotel', id: number, code: string, name: string, body: string, details: string, cityId: number, createdAt: string, updatedAt: string };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename: 'City', id: number, code: string, name: string, countryName: string, countryCode: string, createdAt: string, updatedAt: string }> };

export type GetCityQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GetCityQuery = { __typename?: 'Query', getCity: { __typename: 'City', id: number, code: string, name: string, countryName: string, countryCode: string, createdAt: string, updatedAt: string, hotels: Array<{ __typename: 'Hotel', id: number, code: string, name: string, body: string, details: string, cityId: number, createdAt: string, updatedAt: string }> } };

export const RegularCityFragmentDoc = gql`
    fragment RegularCity on City {
  id
  code
  name
  countryName
  countryCode
  createdAt
  updatedAt
  __typename
}
    `;
export const RegularHotelFragmentDoc = gql`
    fragment RegularHotel on Hotel {
  id
  code
  name
  body
  details
  cityId
  createdAt
  updatedAt
  __typename
}
    `;
export const GetCitiesDocument = gql`
    query getCities {
  getCities {
    ...RegularCity
  }
}
    ${RegularCityFragmentDoc}`;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export function useGetCitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<typeof useGetCitiesSuspenseQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetCityDocument = gql`
    query getCity($code: String!) {
  getCity(code: $code) {
    ...RegularCity
    hotels {
      ...RegularHotel
    }
  }
}
    ${RegularCityFragmentDoc}
${RegularHotelFragmentDoc}`;

/**
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetCityQuery(baseOptions: Apollo.QueryHookOptions<GetCityQuery, GetCityQueryVariables> & ({ variables: GetCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
      }
export function useGetCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export function useGetCitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCitySuspenseQueryHookResult = ReturnType<typeof useGetCitySuspenseQuery>;
export type GetCityQueryResult = Apollo.QueryResult<GetCityQuery, GetCityQueryVariables>;