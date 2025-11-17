import Banners from "../models/Banners.js";

export async function getList(req) {
  const { query: searchQuery, body: searchBody } = req;
  const { page = "1", limit = "10" } = searchQuery;

  // Status filter
  const query = {};
  if (searchBody?.status !== undefined) {
    query.status = searchBody.status;
  }

  // If no pagination params, return full list without pagination
  const hasPagination = searchQuery.page || searchQuery.limit;

  if (!hasPagination) {
    const banners = await Banners.find(query)
      .sort({ createdAt: -1 });

    return { data: banners };
  }

  // Pagination
  const pageNum = Number.parseInt(page, 10);
  const limitNum = Number.parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [banners, total] = await Promise.all([
    Banners.find(query)
      .populate("created_by", "f_name l_name email")
      .populate("updated_by", "f_name l_name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),

    Banners.countDocuments(query),
  ]);

  return {
    data: banners,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
}

export async function create(req, userId) {
    const bannerData = { ...req.body, created_by: userId };
    const newBanner = new Banners(bannerData);
    await newBanner.save();
    return newBanner;
}

export async function getById(id) {
    return Banners.findById(id)
      .populate("created_by", "f_name l_name email")
      .populate("updated_by", "f_name l_name email");
}

export async function update(id, req, userId) {
    const bannerData = { ...req.body, updated_by: userId };
    const updatedBanner = await Banners.findByIdAndUpdate(id, bannerData, { new: true });
    return updatedBanner;
}

export async function remove(id) {
    return Banners.findByIdAndDelete(id);
}
