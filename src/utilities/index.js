// Changing the data structure of an items array into a hash table
// with FoodType - key, sorted array of menu items - value
const organizeItemsByFoodType = (items) => {
  const menuItemsObj = {};
  // sorting items by price in increasing order
  items.sort((a, b) => a.Price - b.Price);
  items.forEach((item, index) => {
    item.idx = index;
    const { FoodType } = item;
    // if a property exists add an item
    if (menuItemsObj[FoodType]) {
      // remembering items position in an array
      // for O(1) instant access, instead of filtering
      // item.idx = menuItemsObj[FoodType].length;
      const newItems = [...menuItemsObj[FoodType], item];
      menuItemsObj[FoodType] = newItems;
    } else {
      // if property does not exist set an item as a first element
      menuItemsObj[FoodType] = [item];
    }
  });
  return menuItemsObj;
};

export default organizeItemsByFoodType;
