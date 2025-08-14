import createHttpError from 'http-errors';

export const getPaginateData = (page, perPage, totalItems) => {
  const totalPages = Math.ceil(totalItems / perPage);
  if (page > totalPages || page < 1) {
    throw createHttpError(
      404,
      `This page is not found (max page is ${totalPages})`,
    );
  }

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};
