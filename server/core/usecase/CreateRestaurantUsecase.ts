import { RestaurantMapper } from "~~/server/mappers/RestaurantMapper";
import { RestaurantRepository } from "~~/server/repositories/RestaurantRepository";
import {
  requireName,
  buildBaseSlug,
  buildUniqueSlug,
} from "~~/server/core/restaurant/createRestaurant";

type CreateRestaurantInput = {
  name?: unknown;
  slug?: unknown;
};

export function CreateRestaurantUsecase(input: CreateRestaurantInput) {
  const repo = new RestaurantRepository();

  const name = requireName(input?.name);
  const baseSlug = buildBaseSlug(input?.slug, name);
  const slug = buildUniqueSlug(repo, baseSlug);

  const row = repo.create({
    id: crypto.randomUUID(),
    name,
    slug,
  });

  return RestaurantMapper(row);
}
