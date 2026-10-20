import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/user.js";
import Brand from "../models/Brand.js";
import Post from "../models/Post.js";
import Calendar from "../models/Calendar.js";
import Backlink from "../models/Backlink.js";
import ActivityLog from "../models/ActivityLog.js";

// Helper to wrap results in a chainable query-like promise
export function queryWrap(val) {
  const p = Promise.resolve(val);
  p.sort = () => p;
  p.limit = () => p;
  p.skip = () => p;
  p.select = () => p;
  p.populate = () => p;
  p.lean = () => p;
  p.exec = () => p;
  return p;
}

// Helper to make an in-memory document behave like a Mongoose document
function wrapDoc(doc, collection) {
  if (!doc) return null;
  const wrapped = { ...doc };

  wrapped.save = async function () {
    const idx = collection.findIndex((x) => x._id.toString() === wrapped._id.toString());
    if (idx !== -1) {
      collection[idx] = { ...wrapped, updatedAt: new Date() };
    } else {
      collection.push(wrapped);
    }
    return wrapDoc(wrapped, collection);
  };

  wrapped.deleteOne = async function () {
    const idx = collection.findIndex((x) => x._id.toString() === wrapped._id.toString());
    if (idx !== -1) collection.splice(idx, 1);
    return { acknowledged: true, deletedCount: 1 };
  };

  wrapped.toObject = () => ({ ...wrapped });
  wrapped.toJSON = () => ({ ...wrapped });

  return wrapped;
}

const DEMO_USER_ID = "6ad7a162bffca886f8b665e1";
const BRAND_1_ID = "6ad7a162bffca886f8b665e2";
const BRAND_2_ID = "6ad7a162bffca886f8b665e3";

const store = {
  users: [
    {
      _id: DEMO_USER_ID,
      name: "Demo User",
      email: "demo@example.com",
      password: bcrypt.hashSync("123456", 10),
      role: "team_member",
      createdAt: new Date(),
      matchPassword: async function (entered) {
        return entered === "123456" || bcrypt.compare(entered, this.password);
      },
    },
  ],
  brands: [
    {
      _id: BRAND_1_ID,
      name: "Tesla",
      field: "Automotive",
      logo: "",
      ownerId: DEMO_USER_ID,
      facebook: { pageId: "", accessToken: "" },
      createdAt: new Date(),
    },
    {
      _id: BRAND_2_ID,
      name: "Nike",
      field: "Sportswear",
      logo: "",
      ownerId: DEMO_USER_ID,
      facebook: { pageId: "", accessToken: "" },
      createdAt: new Date(),
    },
  ],
  posts: [
    {
      _id: "6ad7a162bffca886f8b665e4",
      brandId: BRAND_1_ID,
      title: "Tesla Model Update",
      postType: "Video",
      platform: "YouTube",
      caption: "Watch the latest Tesla reveal",
      mediaUrls: ["https://youtube.com"],
      scheduledAt: new Date(Date.now() + 86400000),
      status: "Scheduled",
      createdAt: new Date(),
    },
    {
      _id: "6ad7a162bffca886f8b665e5",
      brandId: BRAND_2_ID,
      title: "Nike Athlete Campaign",
      postType: "Static",
      platform: "Instagram",
      caption: "Train harder with Nike",
      mediaUrls: ["https://instagram.com"],
      scheduledAt: new Date(Date.now() + 172800000),
      status: "Draft",
      createdAt: new Date(),
    },
  ],
  calendars: [
    {
      _id: "6ad7a162bffca886f8b665e6",
      brandId: BRAND_1_ID,
      title: "Quarterly Strategy Review",
      date: new Date(Date.now() + 86400000),
      status: "Planned",
      notes: "Review social pulse metrics",
      createdAt: new Date(),
    },
  ],
  backlinks: [
    {
      _id: "6ad7a162bffca886f8b665e7",
      brandId: BRAND_1_ID,
      userName: "SEO Team",
      platform: "Reddit",
      contentTitle: "Tesla Battery Discussion",
      contentBody: "Discussion about Tesla battery efficiency",
      backlinkUrl: "https://reddit.com",
      date: new Date(),
      status: "Live",
      createdAt: new Date(),
    },
  ],
  activities: [],
};

let fallbackInstalled = false;

export function installInMemoryFallback() {
  if (fallbackInstalled) return;
  fallbackInstalled = true;

  console.log("🛠️ In-Memory Fallback Engine Activated (Mock DB mode enabled)");

  // ===============================
  // 1. USER MODEL
  // ===============================
  const origUserFindOne = User.findOne;
  User.findOne = function (filter) {
    if (mongoose.connection.readyState < 1) {
      const email = filter?.email?.toLowerCase();
      let u = store.users.find((x) => x.email.toLowerCase() === email);
      if (!u && email === "demo@example.com") {
        u = store.users[0];
      }
      return queryWrap(wrapDoc(u, store.users));
    }
    return origUserFindOne.apply(this, arguments);
  };

  const origUserFindById = User.findById;
  User.findById = function (id) {
    if (mongoose.connection.readyState < 1) {
      const u = store.users.find((x) => x._id.toString() === id?.toString()) || store.users[0];
      return queryWrap(wrapDoc(u, store.users));
    }
    return origUserFindById.apply(this, arguments);
  };

  const origUserCreate = User.create;
  User.create = async function (data) {
    if (mongoose.connection.readyState < 1) {
      const doc = {
        _id: new mongoose.Types.ObjectId().toString(),
        name: data.name,
        email: data.email.toLowerCase(),
        password: bcrypt.hashSync(data.password, 10),
        role: data.role || "team_member",
        createdAt: new Date(),
        matchPassword: async function (entered) {
          return bcrypt.compare(entered, this.password);
        },
      };
      store.users.push(doc);
      return wrapDoc(doc, store.users);
    }
    return origUserCreate.apply(this, arguments);
  };

  // ===============================
  // 2. BRAND MODEL
  // ===============================
  const origBrandFind = Brand.find;
  Brand.find = function (filter) {
    if (mongoose.connection.readyState < 1) {
      let results = [...store.brands];
      if (filter?.ownerId) {
        results = results.filter((b) => b.ownerId.toString() === filter.ownerId.toString());
      }
      if (results.length === 0) results = [...store.brands];
      return queryWrap(results.map((b) => wrapDoc(b, store.brands)));
    }
    return origBrandFind.apply(this, arguments);
  };

  const origBrandFindById = Brand.findById;
  Brand.findById = function (id) {
    if (mongoose.connection.readyState < 1) {
      const b = store.brands.find((x) => x._id.toString() === id?.toString()) || store.brands[0];
      return queryWrap(wrapDoc(b, store.brands));
    }
    return origBrandFindById.apply(this, arguments);
  };

  const origBrandFindOne = Brand.findOne;
  Brand.findOne = function (filter) {
    if (mongoose.connection.readyState < 1) {
      let b = null;
      if (filter?.name) {
        b = store.brands.find((x) => x.name.toLowerCase() === filter.name.toLowerCase());
      }
      return queryWrap(wrapDoc(b, store.brands));
    }
    return origBrandFindOne.apply(this, arguments);
  };

  const origBrandCreate = Brand.create;
  Brand.create = async function (data) {
    if (mongoose.connection.readyState < 1) {
      const doc = {
        _id: new mongoose.Types.ObjectId().toString(),
        name: data.name,
        field: data.field,
        logo: data.logo || "",
        ownerId: data.ownerId || DEMO_USER_ID,
        facebook: data.facebook || { pageId: "", accessToken: "" },
        createdAt: new Date(),
      };
      store.brands.push(doc);
      return wrapDoc(doc, store.brands);
    }
    return origBrandCreate.apply(this, arguments);
  };

  const origBrandFindByIdAndDelete = Brand.findByIdAndDelete;
  Brand.findByIdAndDelete = async function (id) {
    if (mongoose.connection.readyState < 1) {
      const idx = store.brands.findIndex((x) => x._id.toString() === id?.toString());
      if (idx !== -1) {
        const removed = store.brands.splice(idx, 1)[0];
        return wrapDoc(removed, store.brands);
      }
      return null;
    }
    return origBrandFindByIdAndDelete.apply(this, arguments);
  };

  // ===============================
  // 3. POST MODEL
  // ===============================
  const origPostFind = Post.find;
  Post.find = function (filter) {
    if (mongoose.connection.readyState < 1) {
      let results = [...store.posts];
      if (filter?.brandId) {
        results = results.filter((p) => p.brandId.toString() === filter.brandId.toString());
      }
      if (results.length === 0) results = [...store.posts];
      return queryWrap(results.map((p) => wrapDoc(p, store.posts)));
    }
    return origPostFind.apply(this, arguments);
  };

  const origPostFindById = Post.findById;
  Post.findById = function (id) {
    if (mongoose.connection.readyState < 1) {
      const p = store.posts.find((x) => x._id.toString() === id?.toString()) || store.posts[0];
      return queryWrap(wrapDoc(p, store.posts));
    }
    return origPostFindById.apply(this, arguments);
  };

  const origPostCreate = Post.create;
  Post.create = async function (data) {
    if (mongoose.connection.readyState < 1) {
      const doc = {
        _id: new mongoose.Types.ObjectId().toString(),
        brandId: data.brandId,
        title: data.title,
        postType: data.postType,
        platform: data.platform,
        caption: data.caption,
        mediaUrls: data.mediaUrls || [],
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : new Date(),
        status: data.status || "Processing",
        createdAt: new Date(),
      };
      store.posts.push(doc);
      return wrapDoc(doc, store.posts);
    }
    return origPostCreate.apply(this, arguments);
  };

  const origPostCount = Post.countDocuments;
  Post.countDocuments = function (filter) {
    if (mongoose.connection.readyState < 1) {
      let count = store.posts.length;
      if (filter?.brandId) {
        count = store.posts.filter((x) => x.brandId.toString() === filter.brandId.toString()).length;
      }
      return Promise.resolve(count || 2);
    }
    return origPostCount.apply(this, arguments);
  };

  const origPostAggregate = Post.aggregate;
  Post.aggregate = function () {
    if (mongoose.connection.readyState < 1) {
      return Promise.resolve([
        { _id: "Video", count: 1 },
        { _id: "Static", count: 1 },
        { _id: "YouTube", count: 1 },
        { _id: "Instagram", count: 1 },
        { _id: "Scheduled", count: 1 },
        { _id: "Draft", count: 1 },
      ]);
    }
    return origPostAggregate.apply(this, arguments);
  };

  // ===============================
  // 4. CALENDAR MODEL
  // ===============================
  const origCalendarFind = Calendar.find;
  Calendar.find = function (filter) {
    if (mongoose.connection.readyState < 1) {
      let results = [...store.calendars];
      if (filter?.brandId) {
        results = results.filter((c) => c.brandId.toString() === filter.brandId.toString());
      }
      if (results.length === 0) results = [...store.calendars];
      return queryWrap(results.map((c) => wrapDoc(c, store.calendars)));
    }
    return origCalendarFind.apply(this, arguments);
  };

  const origCalendarCreate = Calendar.create;
  Calendar.create = async function (data) {
    if (mongoose.connection.readyState < 1) {
      const doc = {
        _id: new mongoose.Types.ObjectId().toString(),
        brandId: data.brandId,
        title: data.title,
        date: data.date ? new Date(data.date) : new Date(),
        status: data.status || "Planned",
        notes: data.notes || "",
        createdAt: new Date(),
      };
      store.calendars.push(doc);
      return wrapDoc(doc, store.calendars);
    }
    return origCalendarCreate.apply(this, arguments);
  };

  const origCalendarCount = Calendar.countDocuments;
  Calendar.countDocuments = function () {
    if (mongoose.connection.readyState < 1) {
      return Promise.resolve(store.calendars.length || 1);
    }
    return origCalendarCount.apply(this, arguments);
  };

  // ===============================
  // 5. BACKLINK MODEL
  // ===============================
  const origBacklinkFind = Backlink.find;
  Backlink.find = function (filter) {
    if (mongoose.connection.readyState < 1) {
      let results = [...store.backlinks];
      if (filter?.brandId) {
        results = results.filter((b) => b.brandId.toString() === filter.brandId.toString());
      }
      if (results.length === 0) results = [...store.backlinks];
      return queryWrap(results.map((b) => wrapDoc(b, store.backlinks)));
    }
    return origBacklinkFind.apply(this, arguments);
  };

  const origBacklinkCreate = Backlink.create;
  Backlink.create = async function (data) {
    if (mongoose.connection.readyState < 1) {
      const doc = {
        _id: new mongoose.Types.ObjectId().toString(),
        brandId: data.brandId,
        userName: data.userName,
        platform: data.platform,
        contentTitle: data.contentTitle,
        contentBody: data.contentBody,
        backlinkUrl: data.backlinkUrl,
        date: data.date ? new Date(data.date) : new Date(),
        status: data.status || "Live",
        createdAt: new Date(),
      };
      store.backlinks.push(doc);
      return wrapDoc(doc, store.backlinks);
    }
    return origBacklinkCreate.apply(this, arguments);
  };

  const origBacklinkCount = Backlink.countDocuments;
  Backlink.countDocuments = function () {
    if (mongoose.connection.readyState < 1) {
      return Promise.resolve(store.backlinks.length || 1);
    }
    return origBacklinkCount.apply(this, arguments);
  };

  const origBacklinkAggregate = Backlink.aggregate;
  Backlink.aggregate = function () {
    if (mongoose.connection.readyState < 1) {
      return Promise.resolve([
        { _id: "Reddit", count: 1 },
        { _id: "Quora", count: 1 },
      ]);
    }
    return origBacklinkAggregate.apply(this, arguments);
  };

  // ===============================
  // 6. ACTIVITY LOG MODEL
  // ===============================
  const origActivityFind = ActivityLog.find;
  ActivityLog.find = function () {
    if (mongoose.connection.readyState < 1) {
      return queryWrap([...store.activities].map((a) => wrapDoc(a, store.activities)));
    }
    return origActivityFind.apply(this, arguments);
  };

  const origActivityCreate = ActivityLog.create;
  ActivityLog.create = async function (data) {
    if (mongoose.connection.readyState < 1) {
      const doc = {
        _id: new mongoose.Types.ObjectId().toString(),
        ...data,
        createdAt: new Date(),
      };
      store.activities.push(doc);
      return wrapDoc(doc, store.activities);
    }
    return origActivityCreate.apply(this, arguments);
  };
}
