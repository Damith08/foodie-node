const restaurantSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    address: { type: "string" },
    email: {
      type: "string",
      format: "email",
    },
    contact: { type: "number" },
  },
  required: ["name", "address", "email", "contact"],
  additionalProperties: false,
};

module.exports = { restaurantSchema };
