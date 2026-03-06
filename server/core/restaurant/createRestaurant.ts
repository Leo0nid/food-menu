import { slugify } from "~~/server/core/utils/slug";
import { RestaurantError } from "./errors";
import { RestaurantRepository } from "~~/server/repositories/RestaurantRepository";

export function requireName(value: unknown) {
  const name = String(value ?? "").trim();

  if (!name) {
    throw new RestaurantError("name is required");
  }

  return name;
}

export function buildBaseSlug(value: unknown, fallbackName: string) {
  const baseSlug = slugify(String(value ?? fallbackName));

  if (!baseSlug) {
    throw new RestaurantError("invalid slug/name");
  }

  return baseSlug;
}

export function buildUniqueSlug(repo: RestaurantRepository, baseSlug: string) {
  let suffix = 1;
  let slug = baseSlug;

  while (repo.getBySlug(slug)) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  return slug;
}
