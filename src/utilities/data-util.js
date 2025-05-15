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

export const getReviewSource = () => {
  const reviewSourceArray = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/2560px-Yelp_Logo.svg.png",

    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    
    "https://cdn.pixabay.com/photo/2021/11/11/12/41/facebook-6786210_960_720.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trustpilot_Logo_%282022%29.svg/2560px-Trustpilot_Logo_%282022%29.svg.png",
  ];
  return reviewSourceArray[
    Math.floor(Math.random() * reviewSourceArray.length)
  ];
};
