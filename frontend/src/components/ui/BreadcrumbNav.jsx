import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getBrandById } from "../../services/brandService";

const isMongoId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

const ROUTE_LABELS = {
  brands: "Brands",
  studio: "Creative Studio",
  "static-post": "Static Post Guide",
  "carousel-post": "Carousel Guide",
  "reel-video": "Reel Video Guide",
  tools: "Tools Hub",
  calendar: "Content Calendar",
  posts: "Posts",
  backlinks: "Backlinks",
  analytics: "Analytics",
};

const BreadcrumbNav = () => {
  const location = useLocation();
  const { brandId } = useParams();

  const [brandName, setBrandName] = useState(null);

  const pathnames = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const fetchBrand = async () => {
      if (!brandId) return;

      try {
        const brand = await getBrandById(brandId);
        setBrandName(brand.name);
      } catch {
        setBrandName("Brand");
      }
    };

    fetchBrand();
  }, [brandId]);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/" className="text-blue-600 hover:underline">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;

        let label = value;
        let path = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (ROUTE_LABELS[value]) {
          label = ROUTE_LABELS[value];
        } else if (value === brandId) {
          label = brandName || "Brand";
          path = `/brand/${brandId}`;
        } else if (isMongoId(value) && value !== brandId) {
          label = "Details";
        } else {
          label = value
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        }

        if (isLast) {
          return (
            <Typography key={path} color="text.primary">
              {label}
            </Typography>
          );
        }

        return (
          <Link key={path} to={path} className="text-blue-600 hover:underline">
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
