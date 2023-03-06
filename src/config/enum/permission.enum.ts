export const permissionsName = [
  'Product',
  'Category',
  'Trademark',
  'User',
  'Permission',
];

export enum Permissions {
  // product
  createProduct = 'createProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',

  // category
  createCategory = 'createCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',

  // trademark
  createTrademark = 'createTrademark',
  updateTrademark = 'updateTrademark',
  deleteTrademark = 'deleteTrademark',

  // user
  blockUser = 'blockUser',
  unlockUser = 'unlockUser',

  // permission
  getPermissions = 'getPermissions',
  createPermission = 'createPermission',
  updatePermission = 'updatePermission',
  deletePermission = 'deletePermission',
}
