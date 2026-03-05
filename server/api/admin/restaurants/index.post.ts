import { RestaurantRepository } from "../../../repositories/RestaurantRepository";
import { slugify } from "../../../core/utils/slug";
import { createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const name = String(body?.name ?? "").trim();
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: "name is required" });
  }

  const repo = new RestaurantRepository();

  // slug: либо из body.slug, либо из name
  const baseSlug = slugify(String(body?.slug ?? name));
  if (!baseSlug) {
    throw createError({ statusCode: 400, statusMessage: "invalid slug/name" });
  }

  // простая уникализация slug
  let slug = baseSlug;
  let i = 2;
  while (repo.getBySlug(slug)) {
    slug = `${baseSlug}-${i++}`;
  }

  try {
    const row = repo.create({
      id: crypto.randomUUID(),
      name,
      slug,
    });
    return row;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e?.message ?? "Bad Request",
    });
  }
});
