db.Subscription.drop();
db.Customer.drop();
db.Membership.drop();
db.Payment.drop();

db.createCollection("Subscription", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "product",
        "type",
        "name",
        "description",
        "recurrence",
        "price",
        "status",
      ],
      properties: {
        _id: {
          bsonType: "string",
          description: "must be a string for identifier",
        },
        product: {
          validator: {
            $jsonSchema: {
              bsonType: "object",
              required: [
                "item",
                "sku",
                "size",
                "product_id",
                "product_name",
                "description",
                "quantity",
              ],
              properties: {
                item: {
                  bsonType: "string",
                  description: "must be a string for item",
                },
                sku: {
                  bsonType: "string",
                  description: "must be a string for sku",
                },
                size: {
                  bsonType: "int",
                  description: "must be an integer for size",
                },
                product_id: {
                  bsonType: "int",
                  description: "must be an integer for product id",
                },
                product_name: {
                  bsonType: "string",
                  description: "must be a string for product name",
                },
                description: {
                  bsonType: "string",
                  description: "must be a string for description",
                },
                quantity: {
                  bsonType: "int",
                  description: "must be an integer for quantity products",
                },
              },
            },
          },
        },
        type: {
          bsonType: "string",
          description: "must be a string for type",
        },
        name: {
          bsonType: "string",
          description: "must be a string for name",
        },
        description: {
          bsonType: "string",
          description: "must be a string for description",
        },
        recurrence: {
          bsonType: "string",
          description: "must be a string for recurrence",
        },
        price: {
          bsonType: ["double"],
          minimum: 0.0,
          maximum: 9999.99,
          description: "must be a string for identifier",
        },
        status: {
          bsonType: "string",
          description: "must be a string for status",
        },
      },
    },
  },
});

db.createCollection("Customer", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "name",
        "last_name",
        "user_name",
        "password",
        "email",
        "membership",
        "subscription",
        "address",
        "status",
        "payment",
      ],
      properties: {
        _id: {
          bsonType: "string",
          description: "must be a string for identifier",
        },
        name: {
          bsonType: "string",
          description: "must be a string for name",
        },
        last_name: {
          bsonType: "string",
          description: "must be a string for last name",
        },
        user_name: {
          bsonType: "string",
          description: "must be a string for user name",
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required for password",
        },
        email: {
          bsonType: "string",
          description: "must be a string and is required for e-mail",
        },
        membership: {
          bsonType: "string",
          description: "must be a string for membership",
        },
        subscription: {
          bsonType: "string",
          description: "must be a string for subscription",
        },
        address: {
          bsonType: "object",
          required: ["city", "country", "postal_code"],
          properties: {
            city: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            country: {
              bsonType: "string",
              description: "must be a string if the field exists",
            },
            postal_code: {
              bsonType: ["double"],
              description: "must be a string if the field exists",
            },
          },
        },
      },
      status: {
        bsonType: "string",
        description: "must be a string for status",
      },
      payment: {
        bsonType: "object",
        required: [
          "_id",
          "method",
          "subscription",
          "name",
          "total",
          "currency",
        ],
        properties: {
          _id: {
            bsonType: "string",
            description: "must be a string for identifier",
          },
          method: {
            bsonType: "string",
            description: "must be a string for method",
          },
          subscription: {
            bsonType: "string",
            description: "must be a string for subscription",
          },
          name: {
            bsonType: "string",
            description: "must be a string for name",
          },
          total: {
            bsonType: ["double"],
            minimum: 0.0,
            maximum: 9999.99,
            description: "must be a number for total",
          },
          currency: {
            bsonType: "string",
            description: "must be a string for currency",
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
      required: [
        "_id",
        "title",
        "name",
        "description",
        "benefits",
        "startDate",
        "endDate",
      ],
      properties: {
        _id: {
          bsonType: "string",
          description: "must be a string for identifier",
        },
        title: {
          bsonType: "string",
          description: "must be a string for title",
        },
        name: {
          bsonType: "string",
          description: "must be a string for name",
        },
        description: {
          bsonType: "string",
          description: "must be a string for description",
        },
        benefits: {
          bsonType: "object",
          required: ["type_subscription", "freeshipping", "discount"],
          properties: {
            type_subscription: {
              bsonType: "string",
              description: "must be a string for type description",
            },
            freeshipping: {
              bsonType: "Boolean",
              description:
                "must be a true or false for free shipping available",
            },
            discount: {
              bsonType: "int",
              minimum: 0.0,
              maximum: 9999.99,
              description:
                "must be an integer in [ 2017, 3017 ] and is required",
            },
          },
        },
        startDate: {
          bsonType: "Date",
          description: "must be a initial date for signature",
        },
        endDate: {
          bsonType: "Date",
          description: "must be a final date for signature",
        },
      },
    },
  },
});

db.createCollection("Payment", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "method", "subscription", "name", "total", "currency"],
      properties: {
        _id: {
          bsonType: "string",
          description: "must be a string for identifier",
        },
        method: {
          bsonType: "string",
          description: "must be a string for method",
        },
        subscription: {
          bsonType: "string",
          description: "must be a string for subscription",
        },
        name: {
          bsonType: "string",
          description: "must be a string for name",
        },
        total: {
          bsonType: ["double"],
          minimum: 0.0,
          maximum: 9999.99,
          description: "must be a string for identifier",
        },
        currency: {
          bsonType: "string",
          description: "must be a string for currency",
        },
      },
    },
  },
});
