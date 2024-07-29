const CardEvent = {
  CREATE: "card:create", 
  REORDER: "card:reorder",
  DELETE: "card:delete",
  RENAME: "card:rename", 
} as const;

export { CardEvent };
