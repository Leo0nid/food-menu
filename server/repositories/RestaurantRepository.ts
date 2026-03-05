import {
  stmtList,
  stmtGetById,
  stmtGetBySlug,
  stmtInsert,
  stmtDelete,
} from "./sql/RestaurantStatements";

export class RestaurantRepository {
  getList() {
    return stmtList.all();
  }

  getById(id: string) {
    return stmtGetById.get(id);
  }

  getBySlug(slug: string) {
    return stmtGetBySlug.get(slug);
  }

  create(input: { id: string; name: string; slug: string }) {
    stmtInsert.run(input.id, input.name, input.slug);
    return this.getById(input.id);
  }

  delete(id: string) {
    stmtDelete.run(id);
  }
}
