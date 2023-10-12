/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.CartAddItemDocument,
    "mutation CartChangeItemQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartChangeItemQuantityDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      ...CartOrderItem\n    }\n  }\n}": types.CartGetByIdDocument,
    "fragment CartOrderItem on OrderItem {\n  id\n  quantity\n  product {\n    ...ProductListItem\n  }\n}": types.CartOrderItemFragmentDoc,
    "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveItemDocument,
    "query CategoriesGetList {\n  categories {\n    id\n    slug\n    name\n  }\n}": types.CategoriesGetListDocument,
    "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}, first: 1) {\n    id\n    name\n    description\n  }\n}": types.CategoryGetBySlugDocument,
    "query CollectionGetBySlug($slug: String!) {\n  collections(where: {slug: $slug}, first: 1) {\n    id\n    name\n    description\n  }\n}": types.CollectionGetBySlugDocument,
    "fragment CollectionListItem on Collection {\n  id\n  slug\n  name\n  description\n  image {\n    url\n    fileName\n  }\n}": types.CollectionListItemFragmentDoc,
    "query CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}": types.CollectionsGetListDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    createdAt\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "mutation ProductChangeAverageRating($id: ID!, $averageRating: Float!) {\n  updateProduct(where: {id: $id}, data: {averageRating: $averageRating}) {\n    id\n  }\n}": types.ProductChangeAverageRatingDocument,
    "fragment ProductColorVariant on ProductColorVariant {\n  color\n}": types.ProductColorVariantFragmentDoc,
    "fragment ProductDetails on Product {\n  id\n  name\n  description\n  price\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n  variants {\n    ... on ProductSizeColorVariant {\n      ...ProductSizeColorVariant\n    }\n    ... on ProductColorVariant {\n      ...ProductColorVariant\n    }\n  }\n}": types.ProductDetailsFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductDetails\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "fragment ProductSizeColorVariant on ProductSizeColorVariant {\n  size\n  color\n}": types.ProductSizeColorVariantFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!, $limit: Int!, $offset: Int!) {\n  products(\n    first: $limit\n    skip: $offset\n    orderBy: createdAt_DESC\n    where: {categories_some: {slug: $slug}}\n  ) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  products(where: {collections_some: {slug: $slug}}) {\n    ...ProductListItem\n    collections {\n      name\n      description\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetBySearchPhrase($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetBySearchPhraseDocument,
    "query ProductsGetSuggestedByCategoryName($name: String!) {\n  products(where: {categories_some: {name: $name}}, first: 4) {\n    ...ProductListItem\n  }\n}": types.ProductsGetSuggestedByCategoryNameDocument,
    "query ProductsGetList($limit: Int!, $offset: Int!, $orderBy: ProductOrderByInput = createdAt_DESC) {\n  products(first: $limit, skip: $offset, orderBy: $orderBy) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "mutation ReviewCreate($productId: ID!, $name: String!, $email: String!, $headline: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {product: {connect: {id: $productId}}, name: $name, email: $email, headline: $headline, content: $content, rating: $rating}\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
    "fragment ReviewListItem on Review {\n  id\n  createdAt\n  headline\n  content\n  name\n  email\n  rating\n}": types.ReviewListItemFragmentDoc,
    "mutation ReviewPublish($id: ID!) {\n  publishReview(where: {id: $id}, to: PUBLISHED) {\n    id\n  }\n}": types.ReviewPublishDocument,
    "query ReviewsGetByProductId($productId: ID!, $stage: Stage!) {\n  reviews(\n    where: {product: {id: $productId}}\n    stage: $stage\n    orderBy: createdAt_DESC\n  ) {\n    ...ReviewListItem\n  }\n  reviewsConnection(where: {product: {id: $productId}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ReviewsGetByProductIdDocument,
    "query ReviewsRaitingsGetByProductId($productId: ID!, $stage: Stage!) {\n  reviews(\n    where: {product: {id: $productId}}\n    stage: $stage\n    orderBy: createdAt_DESC\n  ) {\n    rating\n  }\n  reviewsConnection(where: {product: {id: $productId}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ReviewsRaitingsGetByProductIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddItem($cartId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, order: {connect: {id: $cartId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      ...CartOrderItem\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartOrderItem on OrderItem {\n  id\n  quantity\n  product {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').CartOrderItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveItem($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    id\n    slug\n    name\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}, first: 1) {\n    id\n    name\n    description\n  }\n}"): typeof import('./graphql').CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetBySlug($slug: String!) {\n  collections(where: {slug: $slug}, first: 1) {\n    id\n    name\n    description\n  }\n}"): typeof import('./graphql').CollectionGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionListItem on Collection {\n  id\n  slug\n  name\n  description\n  image {\n    url\n    fileName\n  }\n}"): typeof import('./graphql').CollectionListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    total\n    createdAt\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        name\n        price\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductChangeAverageRating($id: ID!, $averageRating: Float!) {\n  updateProduct(where: {id: $id}, data: {averageRating: $averageRating}) {\n    id\n  }\n}"): typeof import('./graphql').ProductChangeAverageRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductColorVariant on ProductColorVariant {\n  color\n}"): typeof import('./graphql').ProductColorVariantFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductDetails on Product {\n  id\n  name\n  description\n  price\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n  variants {\n    ... on ProductSizeColorVariant {\n      ...ProductSizeColorVariant\n    }\n    ... on ProductColorVariant {\n      ...ProductColorVariant\n    }\n  }\n}"): typeof import('./graphql').ProductDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductDetails\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n    fileName\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductSizeColorVariant on ProductSizeColorVariant {\n  size\n  color\n}"): typeof import('./graphql').ProductSizeColorVariantFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $limit: Int!, $offset: Int!) {\n  products(\n    first: $limit\n    skip: $offset\n    orderBy: createdAt_DESC\n    where: {categories_some: {slug: $slug}}\n  ) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  products(where: {collections_some: {slug: $slug}}) {\n    ...ProductListItem\n    collections {\n      name\n      description\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetBySearchPhrase($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetBySearchPhraseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSuggestedByCategoryName($name: String!) {\n  products(where: {categories_some: {name: $name}}, first: 4) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetSuggestedByCategoryNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($limit: Int!, $offset: Int!, $orderBy: ProductOrderByInput = createdAt_DESC) {\n  products(first: $limit, skip: $offset, orderBy: $orderBy) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($productId: ID!, $name: String!, $email: String!, $headline: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {product: {connect: {id: $productId}}, name: $name, email: $email, headline: $headline, content: $content, rating: $rating}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewListItem on Review {\n  id\n  createdAt\n  headline\n  content\n  name\n  email\n  rating\n}"): typeof import('./graphql').ReviewListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewPublish($id: ID!) {\n  publishReview(where: {id: $id}, to: PUBLISHED) {\n    id\n  }\n}"): typeof import('./graphql').ReviewPublishDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewsGetByProductId($productId: ID!, $stage: Stage!) {\n  reviews(\n    where: {product: {id: $productId}}\n    stage: $stage\n    orderBy: createdAt_DESC\n  ) {\n    ...ReviewListItem\n  }\n  reviewsConnection(where: {product: {id: $productId}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ReviewsGetByProductIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewsRaitingsGetByProductId($productId: ID!, $stage: Stage!) {\n  reviews(\n    where: {product: {id: $productId}}\n    stage: $stage\n    orderBy: createdAt_DESC\n  ) {\n    rating\n  }\n  reviewsConnection(where: {product: {id: $productId}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ReviewsRaitingsGetByProductIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
