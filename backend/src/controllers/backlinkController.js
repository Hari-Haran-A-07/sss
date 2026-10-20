import Backlink from "../models/Backlink.js";
import asyncHandler from "express-async-handler";
import { paginate } from "../utils/paginate.js";

/* CREATE BACKLINK */

export const createBacklink = asyncHandler(async (req, res) => {
  const backlink = await Backlink.create(req.body);

  res.status(201).json(backlink);
});

/* GET BACKLINKS BY BRAND WITH FILTERING & SEARCH */

export const getBacklinks = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const { status, platform, search, page } = req.query;

  const filter = { brandId };

  if (status) {
    filter.status = status;
  }

  if (platform) {
    filter.platform = platform;
  }

  if (search && search.trim()) {
    filter.$or = [
      { contentTitle: { $regex: search.trim(), $options: "i" } },
      { backlinkUrl: { $regex: search.trim(), $options: "i" } },
      { userName: { $regex: search.trim(), $options: "i" } },
    ];
  }

  if (page) {
    const paginatedResult = await paginate(Backlink, filter, req.query);
    return res.json(paginatedResult);
  }

  const backlinks = await Backlink.find(filter).sort({ date: -1 });
  res.json(backlinks);
});

/* GET SINGLE BACKLINK */

export const getBacklink = asyncHandler(async (req, res) => {
  const backlink = await Backlink.findById(req.params.id);

  if (!backlink) {
    res.status(404);
    throw new Error("Backlink not found");
  }

  res.json(backlink);
});

/* UPDATE BACKLINK */

export const updateBacklink = asyncHandler(async (req, res) => {
  const backlink = await Backlink.findById(req.params.id);

  if (!backlink) {
    res.status(404);
    throw new Error("Backlink not found");
  }

  Object.assign(backlink, req.body);

  const updated = await backlink.save();

  res.json(updated);
});

/* DELETE BACKLINK */

export const deleteBacklink = asyncHandler(async (req, res) => {
  const backlink = await Backlink.findById(req.params.id);

  if (!backlink) {
    res.status(404);
    throw new Error("Backlink not found");
  }

  await backlink.deleteOne();

  res.json({ message: "Backlink removed" });
});
