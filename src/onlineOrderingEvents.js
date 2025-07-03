/*
Online Ordering Events Example

Below are examples of the most common events coming from Online Ordering integrations.
Note that not all of these events are necessary and you can add additional ones for your use case.

Helpful resources:
- https://developers.klaviyo.com/en/docs/guide_to_integrating_a_business_with_brick_and_mortar_locations
- https://developers.klaviyo.com/en/reference/events_api_overview 
*/

import { ApiKeySession, EventsApi } from 'klaviyo-api';

// Load private API key as an environment variable. Note that this API key needs to have write access to events.
// If using a .env file, ensure to load it using dotenv or similar package.
const apiKey = process.env.KLAVIYO_API_KEY;
if (!apiKey) {
  throw new Error('Please set the KLAVIYO_API_KEY environment variable.');
}   

// Instantiate the API session and events API
const session = new ApiKeySession(apiKey);
const eventsApi = new EventsApi(session);

/* 
create Placed Order event. This is the most important event to record.


/This event is tracked when an order was placed and includes all of the product information about the items purchased, restaurant information, and order details that can be used in messages.
It is also necessary to nclude customer information to associate the event with a user profile in Klaviyo.
*/

// first, set up details about what was ordered.
const itemNames = ['Cheese pizza', 'House salad', 'Soda'];
const itemCategories = ['Food', 'Drink'];
const itemCount = 3;

// include restaurant information
let restaurantName = 'Klaviyo Cafe (Denver)';
let restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include payment details
const placedOrderValue = 43.19; // Total order value
const subtotal = 39.99; // Subtotal before tax and discounts
const tax = 3.20; // Tax amount
const discountApplied = 0.00; // Discount applied, if any
const currency = 'USD'; // Currency of the transaction

// include additional information
const orderId = 'order-67890'; // Unique identifier for the order
const timeOfOrder = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC 
const extra = {
  orderStatus: 'placed', // Status of the order
  paymentMethod: 'credit_card', // Payment method used
  deliveryMethod: 'pickup', // Delivery method chosen
  numberOfGuests: 1 // Number of guests for the order
}

// finally, include information about the user placing the order
let customerEmail = 'customer email' // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.
let firstName = 'John'; // Customer's first name
let lastName = 'Doe'; // Customer's last name

// create the event payload including all of the information above
const placedOrderPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Item names": itemNames,
        "Item categories": itemCategories,
        "Item count": itemCount,
        "Restaurant name": restaurantName,
        "Restaurant ID": restaurantId,
        "Order ID": orderId,
        "Subtotal": subtotal,
        "Tax": tax,
        "Discount applied": discountApplied,
        "extra": extra
      },
      time: timeOfOrder,
      value: placedOrderValue,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Placed Order'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail,
            first_name: firstName,
            last_name: lastName
          }
        }
      }
    }
  }
};

// send the event to Klaviyo
await eventsApi.createEvent(placedOrderPayload)
  .then(response => {
    console.log('Placed Order event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Placed Order event:', error);
  });


/* 
create Ordered Product event.

This event is tracked when a customer places an order, but a separate event is tracked for each item someone purchases.
For example, if someone orders a pizza and a salad, 1 Placed Order event will be tracked along with 2 Ordered Product events.
This is useful when creating behavioral segments based on product variant options and otehr detailed information that's not available in the Placed Order event.
*/

// set up details about the ordered product
const orderedProductName = 'Cheese pizza'; // Name of the product ordered
const orderedProductCategories = ['Food','Pizza']; // Category of the product ordered
const value = 19.99; // Value of the product ordered
const productId = 'product-12345'; // Unique identifier for the product
const productVariantId = 'variant-67890'; // Unique identifier for the product variant
const quantity = 1; // Quantity of the product ordered
const timeOfOrderedProduct = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC

// include restaurant information
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include profile information
customerEmail = 'customer email'; // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.
firstName = 'John'; // Customer's first name
lastName = 'Doe'; // Customer's last name

// create the event payload for the Ordered Product event
const orderedProductPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Name": orderedProductName,
        "Categories": orderedProductCategories,
        "ProductID": productId, 
        "VariantID": productVariantId,
        "Quantity": quantity,
        "Restaurant name": restaurantName,
        "Restaurant ID": restaurantId
      },
      time: timeOfOrderedProduct,
      value: value,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Ordered Product'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail,
            first_name: firstName,
            last_name: lastName
          }
        }
      }
    }
  }
};

//send the Ordered Product event to Klaviyo
await eventsApi.createEvent(orderedProductPayload)
  .then(response => {
    console.log('Ordered Product event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Ordered Product event:', error);
  });

/*
create Fulfilled Order event.

This event is tracked when an order is marked as "fulfilled" in your restaurant.
The event Klaviyo tracks includes all product information regarding the items someone purchased, including product names and images, so you can use that information in purchase follow up emails.
*/

// include informaiton about the products ordered
const fulfilledProductNames = ['Cheese pizza', 'House salad', 'Soda']; // Names of the products ordered
const fulfilledProductCategories = ['Food', 'Drink']; // Categories of the products ordered
const fulfilledProductCount = 3; // Total number of products ordered
const fulfilledOrderValue = 43.19; // Total value of the fulfilled order
const fulfilledOrderId = 'order-67890'; // Unique identifier for the fulfilled order
const fulfilledTimeOfOrder = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC

// include restaurant information
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include source and fulfillment method
const source = 'online'; // Source of the order (e.g., online, in-person)
const fulfillmentMethod = 'pickup'; // Fulfillment method used (e.g., pickup, delivery)

// include profile information
customerEmail = 'customer email'; // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.

// include additional information
const extraFulfilled = {
  orderStatus: 'fulfilled', // Status of the order
  paymentMethod: 'credit_card', // Payment method used
  deliveryMethod: 'pickup', // Delivery method chosen
  numberOfGuests: 1 // Number of guests for the order
}

// create the event payload for the Fulfilled Order event
const fulfilledOrderPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Items": fulfilledProductNames,
        "Item categories": fulfilledProductCategories,
        "Item count": fulfilledProductCount,
        "Order ID": fulfilledOrderId,
        "Source": source,
        "Fulfillment method": fulfillmentMethod,
        "extra": extraFulfilled
      },
      time: fulfilledTimeOfOrder,
      value: fulfilledOrderValue,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Fulfilled Order'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// send the Fulfilled Order event to Klaviyo
await eventsApi.createEvent(fulfilledOrderPayload)
  .then(response => {
    console.log('Fulfilled Order event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Fulfilled Order event:', error);
  });

/*
create Refunded Order event.

This event is tracked when a customer completes the checkout process in your restaurant and a payment is made, but the customer requests the payment to be returned.
The event Klaviyo tracks includes all of the product information about the items someone purchased, including product names, images, and variant information.
*/

// include information about the products ordered
const refundedProductNames = ['Cheese pizza', 'House salad', 'Soda']; // Names of the products ordered
const refundedProductCategories = ['Food', 'Drink']; // Categories of the products ordered
const refundedProductCount = 3; // Total number of products ordered   

// include information about the refunded order
const refundedOrderValue = 43.19; // Total value of the refunded order
const refundedOrderId = 'order-67890'; // Unique identifier for the refunded order
const timeOfRefund = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC

// include restaurant information
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include profile information
customerEmail = 'customer email'; // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.

// create the event payload for the Refunded Order event
const refundedOrderPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Items": refundedProductNames,
        "Item categories": refundedProductCategories,
        "Item count": refundedProductCount,
        "Order ID": refundedOrderId
      },
      time: timeOfRefund,
      value: refundedOrderValue,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Refunded Order'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// send the Refunded Order event to Klaviyo
await eventsApi.createEvent(refundedOrderPayload)
  .then(response => {
    console.log('Refunded Order event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Refunded Order event:', error);
  });

/* 
create Closed Order event.

This event is tracked when an order is considered complete.
*/

// include information about the products ordered
const closedOrderProductNames = ['Cheese pizza', 'House salad', 'Soda']; // Names of the products ordered
const closedOrderProductCategories = ['Food', 'Drink']; // Categories of the products ordered
const closedOrderProductCount = 3; // Total number of products ordered

// include information about the closed order
const closedOrderValue = 43.19; // Total value of the closed order
const closedOrderId = 'order-67890'; // Unique identifier for the closed order
const timeOfClosure = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC

// include restaurant information
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include profile information
customerEmail = 'customer email'; // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.

// include fulfillment method
const fulfillmentMethodClosed = 'pickup'; // Fulfillment method used (e.g., pickup, delivery)

// create the event payload for the Closed Order event
const closedOrderPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Items": closedOrderProductNames,
        "Item categories": closedOrderProductCategories,
        "Item count": closedOrderProductCount,
        "Order ID": closedOrderId,
        "Fulfillment method": fulfillmentMethodClosed
      },
      time: timeOfClosure,
      value: closedOrderValue,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Closed Order'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// send the Closed Order event to Klaviyo
await eventsApi.createEvent(closedOrderPayload)
  .then(response => {
    console.log('Closed Order event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Closed Order event:', error);
  });

/* 
create Adjusted Order event.

This event is tracked when an order has been fully or partially adjusted or refunded.
*/

// include information about the products ordered
const adjustedProductNames = ['Cheese pizza', 'House salad']; // Names of the products ordered
const adjustedProductCategories = ['Food', 'Drink']; // Categories of the products ordered
const adjustedProductCount = 3; // Total number of products ordered

// include information about the adjusted order
const adjustedOrderId = 'order-67890'; // Unique identifier for the adjusted order
const timeOfAdjustment = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC
const adjustmentReason = 'Customer changed mind'; // Reason for the adjustment
const adjustmentType = 'partial refund'; // Type of adjustment (e.g., full, partial)

// reference the initial order
const initialOrderId = 'order-67890'; // Unique identifier for the initial order

// inlcude price amounts
const amountRefunded = 4.99; // Amount refunded for the adjusted order
const amountCharged = 0.00; // Amount charged for the adjusted order
const adjustedOrderValue = 38.20; // Total value of the adjusted order

// include restaurant information
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include profile information
customerEmail = 'customer email'; // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.

// create the event payload for the Adjusted Order event
const adjustedOrderPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Items": adjustedProductNames,
        "Item categories": adjustedProductCategories,
        "Item count": adjustedProductCount,
        "Order ID": adjustedOrderId,
        "Initial Order ID": initialOrderId,
        "Amount refunded": amountRefunded,
        "Amount charged": amountCharged,
        "Adjustment reason": adjustmentReason,
        "Adjustment type": adjustmentType,
        "Restaurant name": restaurantName,
        "Restaurant ID": restaurantId
      },
      time: timeOfAdjustment,
      value: adjustedOrderValue,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Adjusted Order'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// send the Adjusted Order event to Klaviyo
await eventsApi.createEvent(adjustedOrderPayload)
  .then(response => {
    console.log('Adjusted Order event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Adjusted Order event:', error);
  });

/* 
create Cancelled Order event.

This event is tracked when an order was cancelled by a user or the system.
*/

// include information about the products ordered
const cancelledProductNames = ['Cheese pizza', 'House salad', 'Soda']; // Names of the products ordered
const cancelledProductCategories = ['Food', 'Drink']; // Categories of the products ordered
const cancelledProductCount = 3; // Total number of products ordered  

// include information about the cancelled order
const cancelledOrderId = 'order-67890'; // Unique identifier for the cancelled order
const timeOfCancellation = '2025-06-30T14:30:00Z'; // Example: June 30, 2025 at 2:30 PM UTC 
const cancellationReason = 'Customer changed mind'; // Reason for the cancellation
const cancellationType = 'full refund'; // Type of cancellation (e.g., full, partial
const amountRefundedCancelled = 43.19; // Amount refunded for the cancelled order
const amountChargedCancelled = 0.00; // Amount charged for the cancelled order

// include restaurant information
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant

// include profile information
customerEmail = 'customer email'; // Customer's email address. This will be used to associate the event with a user profile in Klaviyo.

// create the event payload for the Cancelled Order event
const cancelledOrderPayload = {
  data: {
    type: 'event',
    attributes: {
      properties: {
        "Items": cancelledProductNames,
        "Item categories": cancelledProductCategories,
        "Item count": cancelledProductCount,
        "Order ID": cancelledOrderId,
        "Cancellation reason": cancellationReason,
        "Cancellation type": cancellationType,
        "Amount refunded": amountRefundedCancelled,
        "Amount charged": amountChargedCancelled,
        "Restaurant name": restaurantName,
        "Restaurant ID": restaurantId
      },
      time: timeOfCancellation,
      value: amountRefundedCancelled,
      value_currency: currency,
      metric: {
        data: {
          type: 'metric',
          attributes: {
            name: 'Cancelled Order'
          }
        }
      },
      profile: {
        data: {
          type: 'profile',
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// send the Cancelled Order event to Klaviyo
await eventsApi.createEvent(cancelledOrderPayload)
  .then(response => {
    console.log('Cancelled Order event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Cancelled Order event:', error);
  });