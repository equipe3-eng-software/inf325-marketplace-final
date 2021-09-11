db.Customer.drop();
db.Membership.drop();
db.Payment.drop();
db.Product.drop();
db.Subscription.drop();

db.createCollection("Customer", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "address",
        "email",
        "lastname",
        "membership",
        "name",
        "password",
        "status",
        "subscriptions",
        "username",
      ],
      properties: {
        _id: { bsonType: "objectid" },
        address: {
          bsonType: "object",
          required: ["city", "country", "postal_code"],
          properties: {
            city: { bsonType: "string" },
            country: { bsonType: "string" },
            postal_code: { bsonType: "string" },
            street: { bsonType: "string" },
          },
        },
        email: { bsonType: "string" },
        lastname: { bsonType: "string" },
        membership: { bsonType: "string" },
        name: { bsonType: "string" },
        password: { bsonType: "string" },
        status: { bsonType: "string" },
        subscriptions: {
          validator: {
            $jsonSchema: {
              bsonType: "array",
              uniqueItems: true,
              items: {
                required: ["_id", "currency", "method", "name", "payment"],
                properties: {
                  currency: { bsonType: "string" },
                  payment_method: { bsonType: "string" },
                  sub_id: { bsonType: "objectid" },
                  sub_name: { bsonType: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
});

db.createCollection("Membership", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "benefits", "description", "name"],
      properties: {
        _id: { bsonType: "objectid" },
        benefits: {
          bsonType: "object",
          minItems: 1,
          required: ["type_subscription", "freeshipping", "discount"],
          properties: {
            type_subscription: { bsonType: "string" },
            freeshipping: { bsonType: "boolean" },
            discount: { bsonType: "number", minimum: 0, maximum: 1 },
          },
        },
        description: { bsonType: "string" },
        name: { bsonType: "string" },
      },
    },
  },
});

db.createCollection("Payment", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "currency", "method", "name"],
      properties: {
        _id: { bsonType: "objectid" },
        currency: { bsonType: "string" },
        method: { bsonType: "string" },
        name: { bsonType: "string" },
      },
    },
  },
});

db.createCollection("Product", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "description", "price", "product_name", "sku", "type"],
      properties: {
        _id: { bsonType: "objectid" },
        description: { bsonType: "string" },
        price: { bsonType: "number" },
        product_name: { bsonType: "string" },
        sku: { bsonType: "string" },
        type: { bsonType: "string" },
      },
    },
  },
});

db.createCollection("Subscription", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "description",
        "price",
        "products",
        "recurrence",
        "status",
        "type",
      ],
      properties: {
        _id: {
          bsonType: "string",
          description: "must be a string for identifier",
        },
        price: { bsonType: "number" },
        products: {
          validator: {
            $jsonSchema: {
              bsonType: "array",
              uniqueItems: true,
              items: {
                required: ["product_name", "qtd", "sku"],
                properties: {
                  product_name: { bsonType: "string" },
                  qtd: { bsonType: "number" },
                  sku: { bsonType: "string" },
                },
              },
            },
          },
        },
        recurrence: { bsonType: "string" },
        status: { bsonType: "string" },
        type: { bsonType: "string" },
      },
    },
  },
});
