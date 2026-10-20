/**
 * Pagination and Sorting Utility for Mongoose Queries
 *
 * @param {import("mongoose").Model} model - The Mongoose model to query
 * @param {Object} filter - MongoDB query filter object
 * @param {Object} queryParams - Express req.query object (page, limit, sortBy, sortOrder)
 * @param {Object} options - Additional options (populate, select)
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export const paginate = async (model, filter = {}, queryParams = {}, options = {}) => {
  const page = Math.max(1, parseInt(queryParams.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(queryParams.limit, 10) || 20));
  const skip = (page - 1) * limit;

  // Sorting
  const sortBy = queryParams.sortBy || "createdAt";
  const sortOrder = queryParams.sortOrder === "asc" ? 1 : -1;
  const sort = { [sortBy]: sortOrder };

  // Query construction
  let query = model.find(filter).sort(sort).skip(skip).limit(limit);

  if (options.populate) {
    query = query.populate(options.populate);
  }

  if (options.select) {
    query = query.select(options.select);
  }

  // Execute query and count in parallel
  const [data, total] = await Promise.all([
    query.exec(),
    model.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
