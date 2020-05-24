import _ from "lodash";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const pageItems = _(items).slice(startIndex).take(pageSize).value();
  return pageItems;
};
