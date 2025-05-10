export const initCap = (str) => {
  return str
    .toLowerCase()
    .replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
    });
};

export const getListOfCategories = (categoriesMap) => {
  const categories = Object.keys(categoriesMap);
  let categoryListObject = [];
  categories.map((c) =>
    categoryListObject.push({
      value: c,
      label: initCap(c),
    })
  );
  return categoryListObject;
};
export const getServices = (categoriesMap, category) =>
  categoriesMap[category];
