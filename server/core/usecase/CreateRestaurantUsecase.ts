import { createError } from "h3";
import { RestaurantMapper } from "~~/server/mappers/RestaurantMapper";
import { slugify } from "~~/server/core/utils/slug";
import { RestaurantRepository } from "~~/server/repositories/RestaurantRepository";

const BAD_REQUEST = 400;

type CreateRestaurantInput = {
  name?: unknown;
  slug?: unknown;
};

function requireName(value: unknown) {
  const name = String(value ?? "").trim();
  if (!name) {
    throw createError({
      statusCode: BAD_REQUEST,
      statusMessage: "name is required",
    });
  }
  return name;
}

function buildBaseSlug(value: unknown, fallbackName: string) {
  const baseSlug = slugify(String(value ?? fallbackName));
  if (!baseSlug) {
    throw createError({
      statusCode: BAD_REQUEST,
      statusMessage: "invalid slug/name",
    });
  }

  return baseSlug;
}

function buildUniqueSlug(repo: RestaurantRepository, baseSlug: string) {
  let suffix = 1;
  let slug = baseSlug;

  while (repo.getBySlug(slug)) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  return slug;
}

export function CreateRestaurantUsecase(input: CreateRestaurantInput) {
  const repo = new RestaurantRepository();
  const name = requireName(input?.name);
  const baseSlug = buildBaseSlug(input?.slug, name);
  const slug = buildUniqueSlug(repo, baseSlug);

  try {
    const row = repo.create({
      id: crypto.randomUUID(),
      name,
      slug,
    });
    return RestaurantMapper(row);
  } catch (error: any) {
    throw createError({
      statusCode: BAD_REQUEST,
      statusMessage: error?.message ?? "Bad Request",
    });
  }
}
