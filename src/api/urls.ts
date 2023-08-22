export const URLS = {
  GET_PRODUCTS_LIST: `sites/MLU/search?:query&limit=25`,
  GET_CATEGORY_DETAILS: "categories/:query",
  GET_ITEM_DATA: "items/:query",
  GET_ITEM_DESCRIPTION: "items/:query/description",
  GET_ITEM_QUESTIONS: "questions/search?item=:query",
  GET_ACCEPTED_PAYMENT_METHODS: "/users/:query/accepted_payment_methods",
  GET_CATEGORIES: "sites/MLU/categories",
};
