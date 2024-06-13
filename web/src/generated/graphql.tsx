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

export type Booking = {
  __typename?: 'Booking';
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['Float']['output'];
  details: Scalars['String']['output'];
  hotel: Hotel;
  hotelId: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Hotel = {
  __typename?: 'Hotel';
  body: Scalars['String']['output'];
  bookings: Array<Booking>;
  city: City;
  cityId: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  details: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllCities: Array<City>;
  getBookings: Array<Booking>;
  getCity: City;
  me?: Maybe<User>;
};


export type QueryGetCityArgs = {
  code: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  GSTNumber: Scalars['String']['output'];
  PANName: Scalars['String']['output'];
  PANNumber: Scalars['String']['output'];
  address: Scalars['String']['output'];
  bookings: Array<Booking>;
  city: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  lastName: Scalars['String']['output'];
  number: Scalars['String']['output'];
  pinCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserInput = {
  GSTNumber: Scalars['String']['input'];
  PANName: Scalars['String']['input'];
  PANNumber: Scalars['String']['input'];
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  number: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pinCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularBookingFragment = { __typename: 'Booking', id: string, details: string, creatorId: number, hotelId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string }, hotel: { __typename: 'Hotel', id: number, code: string, name: string, body: string, details: string, cityId: number, createdAt: string, updatedAt: string } };

export type RegularCityFragment = { __typename: 'City', id: number, code: string, name: string, countryName: string, countryCode: string, createdAt: string, updatedAt: string };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularHotelFragment = { __typename: 'Hotel', id: number, code: string, name: string, body: string, details: string, cityId: number, createdAt: string, updatedAt: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string } | null };

export type RegularUserFragment = { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string } | null } };

export type GetAllCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCitiesQuery = { __typename?: 'Query', getAllCities: Array<{ __typename: 'City', id: number, code: string, name: string, countryName: string, countryCode: string, createdAt: string, updatedAt: string }> };

export type GetBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingsQuery = { __typename?: 'Query', getBookings: Array<{ __typename: 'Booking', id: string, details: string, creatorId: number, hotelId: number, createdAt: string, updatedAt: string, creator: { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string }, hotel: { __typename: 'Hotel', id: number, code: string, name: string, body: string, details: string, cityId: number, createdAt: string, updatedAt: string } }> };

export type GetCityQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GetCityQuery = { __typename?: 'Query', getCity: { __typename: 'City', id: number, code: string, name: string, countryName: string, countryCode: string, createdAt: string, updatedAt: string, hotels: Array<{ __typename: 'Hotel', id: number, code: string, name: string, body: string, details: string, cityId: number, createdAt: string, updatedAt: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: number, firstName: string, lastName: string, companyName: string, number: string, PANNumber: string, PANName: string, GSTNumber: string, address: string, country: string, state: string, city: string, pinCode: string, email: string, createdAt: string, updatedAt: string } | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstName
  lastName
  companyName
  number
  PANNumber
  PANName
  GSTNumber
  address
  country
  state
  city
  pinCode
  email
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
export const RegularBookingFragmentDoc = gql`
    fragment RegularBooking on Booking {
  id
  details
  creatorId
  creator {
    ...RegularUser
  }
  hotelId
  hotel {
    ...RegularHotel
  }
  createdAt
  updatedAt
  __typename
}
    ${RegularUserFragmentDoc}
${RegularHotelFragmentDoc}`;
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
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetAllCitiesDocument = gql`
    query getAllCities {
  getAllCities {
    ...RegularCity
  }
}
    ${RegularCityFragmentDoc}`;

/**
 * __useGetAllCitiesQuery__
 *
 * To run a query within a React component, call `useGetAllCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>(GetAllCitiesDocument, options);
      }
export function useGetAllCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>(GetAllCitiesDocument, options);
        }
export function useGetAllCitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCitiesQuery, GetAllCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCitiesQuery, GetAllCitiesQueryVariables>(GetAllCitiesDocument, options);
        }
export type GetAllCitiesQueryHookResult = ReturnType<typeof useGetAllCitiesQuery>;
export type GetAllCitiesLazyQueryHookResult = ReturnType<typeof useGetAllCitiesLazyQuery>;
export type GetAllCitiesSuspenseQueryHookResult = ReturnType<typeof useGetAllCitiesSuspenseQuery>;
export type GetAllCitiesQueryResult = Apollo.QueryResult<GetAllCitiesQuery, GetAllCitiesQueryVariables>;
export const GetBookingsDocument = gql`
    query getBookings {
  getBookings {
    ...RegularBooking
  }
}
    ${RegularBookingFragmentDoc}`;

/**
 * __useGetBookingsQuery__
 *
 * To run a query within a React component, call `useGetBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
      }
export function useGetBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
        }
export function useGetBookingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
        }
export type GetBookingsQueryHookResult = ReturnType<typeof useGetBookingsQuery>;
export type GetBookingsLazyQueryHookResult = ReturnType<typeof useGetBookingsLazyQuery>;
export type GetBookingsSuspenseQueryHookResult = ReturnType<typeof useGetBookingsSuspenseQuery>;
export type GetBookingsQueryResult = Apollo.QueryResult<GetBookingsQuery, GetBookingsQueryVariables>;
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
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;