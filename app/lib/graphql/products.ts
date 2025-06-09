import { gql } from '@apollo/client';

// Queries
export const GET_PRODUCTS = gql`
  query GetProducts(
    $categoryId: ID
    $searchName: String
    $minPrice: Float
    $maxPrice: Float
    $limit: Int
    $offset: Int
    $sortBy: String
    $sortOrder: SortOrder
  ) {
    products(
      categoryId: $categoryId
      searchName: $searchName
      minPrice: $minPrice
      maxPrice: $maxPrice
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      id
      name
      description
      price
      stock
      mainImageUrl
      imageUrls
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      mainImageUrl
      imageUrls
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`;

// Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      stock
      mainImageUrl
      imageUrls
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      stock
      mainImageUrl
      imageUrls
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: CreateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`; 