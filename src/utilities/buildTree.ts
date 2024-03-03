import { NestedCategory } from "@/app/api/category/category.service";
import { Category } from "@prisma/client";

//Consumes more memory
export function buildCategoryTree2(categories: Category[]): NestedCategory[] {
  const internalArray: NestedCategory[] = JSON.parse(
    JSON.stringify(categories),
  );
  const categoryMap: Record<string, NestedCategory> = {};
  const categoryTree: NestedCategory[] = [];

  // Create a map of categories using their IDs for quick access.
  internalArray.forEach((category) => {
    categoryMap[category.id] = category;
  });

  // Build the category tree by linking child categories to their parent categories.
  internalArray.forEach((category) => {
    if (category.parentId === null) {
      // If a category has no parent, it's a top-level category.
      categoryTree.push(category);
    } else {
      // If a category has a parent, add it as a child to the parent category.
      const parentCategory = categoryMap[category.parentId];
      if (parentCategory) {
        if (!parentCategory.subCategories) {
          parentCategory.subCategories = [];
        }
        parentCategory.subCategories.push(category);
      }
    }
  });

  return categoryTree;
}

//Consumes less memory
export function buildCategoryTree(categories: Category[]): NestedCategory[] {
  const internalArray: NestedCategory[] = JSON.parse(
    JSON.stringify(categories),
  );

  const categoryTree: NestedCategory[] = [];

  internalArray.forEach((category) => {
    if (category.parentId === null) {
      // If a category has no parent, it's a top-level category.
      categoryTree.push(category);
    } else {
      // If a category has a parent, find the parent category in the tree and add it as a child.
      const findParent = (node: NestedCategory): boolean => {
        if (node.id === category.parentId) {
          if (!node.subCategories) {
            node.subCategories = [];
          }
          node.subCategories.push(category);
          return true;
        }
        if (node.subCategories) {
          return node.subCategories.some(findParent);
        }
        return false;
      };

      categoryTree.some(findParent);
    }
  });

  categoryTree.sort(
    (a, b) =>
      new Date(b.createdAt || new Date()).getTime() -
      new Date(a.createdAt || new Date()).getTime(),
  );

  return categoryTree;
}
