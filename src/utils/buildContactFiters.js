export const buildContactFiters = (query) => {
  return {
    type: query.type,
    isFavourite: query.isFavourite,
  };
};
