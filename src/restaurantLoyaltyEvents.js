/*
Restaurant Loyalty Events Example

Below are examples of the most common events coming from Restaurant Loyalty integrations.
Note that not all of these events are necessary and you can add additional ones for your use case.

Helpful resources:
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
create Signed Up event.

This event occurs when a customer signs up for your loyalty program.
This is the first step in the loyalty program lifecycle.
*/

// include signup location information
let locationId = 'location-12345'; // Unique identifier for the location
let locationName = 'Klaviyo Cafe (Denver)'; // Name of the location

// include initial loyalty program information
let loyaltyProgramId = 'loyalty-program-12345'; // Unique identifier for the loyalty program
let loyaltyProgramName = 'Klaviyo Loyalty Program'; // Name of the loyalty program
let loyaltyProgramTier = 'Gold'; // Initial tier of the loyalty program (e.g., Silver, Gold, Platinum)
let loyaltyProgramPoints = 0; // Initial points in the loyalty program
const loyaltySignUpDate = '2023-10-02T12:00:00Z'; // Date and time of signing up for the loyalty program in ISO 8601 format

// include profile information to associate the event with a user profile in Klaviyo
let customerEmail = 'customer email'; // Customer's email address
let customerPhoneNumber = 'customer phone number'; // Customer's phone number (optional)
let customerFirstName = 'customer first name'; // Customer's first name (optional)
let customerLastName = 'customer last name'; // Customer's last name (optional)
let customerLoyaltyPoints = loyaltyProgramPoints; // Customer's initial loyalty points

// create the signed up event payload
const signedUpEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                LocationId: locationId,
                LocationName: locationName,
                LoyaltyProgramId: loyaltyProgramId,
                LoyaltyProgramName: loyaltyProgramName,
                LoyaltyProgramTier: loyaltyProgramTier,
                LoyaltyProgramPoints: loyaltyProgramPoints
            },
            time: loyaltySignUpDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Signed Up for Loyalty Program'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        phone_number: customerPhoneNumber,
                        first_name: customerFirstName,
                        last_name: customerLastName,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the signed up event to Klaviyo
await eventsApi.createEvent(signedUpEventPayload)
    .then(response => {
        console.log('Signed Up for Loyalty Program event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Signed Up for Loyalty Program event:', error);
    });


/*
create Created Redemption event.

These events happen when a customer updates a redemption.
*/

// include redemption information
let redemptionId = 'redemption-12345'; // Unique identifier for the redemption
let redemptionDate = '2023-10-01T12:00:00Z'; // Date and time of the redemption in ISO 8601 format
let redemptionPoints = 100; // Number of points redeemed
let redemptionDescription = 'Free dessert'; // Description of the redemption    

// include restaurant information
let restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
let restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints - redemptionPoints; // Customer's updated loyalty points after redemption

// create the created redemption event payload
const createdRedemptionEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                RedemptionId: redemptionId,
                RedemptionPoints: redemptionPoints,
                RedemptionDescription: redemptionDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName
            },
            time: redemptionDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Created Loyalty Redemption'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the created redemption event to Klaviyo
await eventsApi.createEvent(createdRedemptionEventPayload)
    .then(response => {
        console.log('Created Loyalty Redemption event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Created Loyalty Redemption event:', error);
    });


/*
created Updated Redemption event.

These events happen when a customer updates a redemption.
*/

// include updated redemption information
let updatedRedemptionId = 'redemption-12345'; // Unique identifier for the updated redemption
let updatedRedemptionDate = '2023-10-01T12:00:00Z'; // Date and time of the updated redemption in ISO 8601 format
let updatedRedemptionPoints = 150; // Updated number of points redeemed
let updatedRedemptionDescription = 'Free dessert and drink'; // Updated description of the redemption

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant 

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints - updatedRedemptionPoints; // Customer's updated loyalty points after redemption

// create the updated redemption event payload
const updatedRedemptionEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                RedemptionId: updatedRedemptionId,
                RedemptionPoints: updatedRedemptionPoints,
                RedemptionDescription: updatedRedemptionDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName 
            },
            time: updatedRedemptionDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Updated Loyalty Redemption'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the updated redemption event to Klaviyo
await eventsApi.createEvent(updatedRedemptionEventPayload)
    .then(response => {
        console.log('Updated Loyalty Redemption event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Loyalty Program Updated Redemption event:', error);
    });

/*
create Applied Redemption event.

This event occurs when a customer applies a redemption at the restaurant.
*/

// include applied redemption information
let appliedRedemptionId = 'redemption-12345'; // Unique identifier for the applied redemption
let appliedRedemptionDate = '2023-10-01T12:00:00Z'; // Date and time of the applied redemption in ISO 8601 format
let appliedRedemptionPoints = 100; // Number of points applied for the redemption
let appliedRedemptionDescription = 'Free dessert'; // Description of the applied redemption 

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints - appliedRedemptionPoints; // Customer's updated loyalty points after applying redemption

// create the applied redemption event payload
const appliedRedemptionEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                RedemptionId: appliedRedemptionId,
                RedemptionPoints: appliedRedemptionPoints,
                RedemptionDescription: appliedRedemptionDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName
            },
            time: appliedRedemptionDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Applied Loyalty Redemption'
                    }  
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the applied redemption event to Klaviyo
await eventsApi.createEvent(appliedRedemptionEventPayload)
    .then(response => {
        console.log('Applied Loyalty Redemption event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Applied Loyalty Redemption event:', error);
    });

/* 
create Checked In event.

This event pccurs when a user checks in to the loyalty program or for a specific gift.
*/

// include check-in information
let checkInId = 'checkin-12345'; // Unique identifier for the check-in
let checkInDate = '2023-10-01T12:00:00Z'; // Date and time of the check-in in ISO 8601 format
let checkInPoints = 50; // Number of points awarded for the check-in
let checkInDescription = 'Checked in at Klaviyo Cafe'; // Description of the check-in

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints + checkInPoints; // Customer's updated loyalty points after check-in

// create the check-in event payload
const checkInEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                CheckInId: checkInId,
                CheckInPoints: checkInPoints,
                CheckInDescription: checkInDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName
            },
            time: checkInDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Checked In to Loyalty Program'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};  

// send the check-in event to Klaviyo
await eventsApi.createEvent(checkInEventPayload)
    .then(response => {
        console.log('Checked In to Loyalty Program event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Checked In to Loyalty Program event:', error);
    });

/*
create Earned Reward event.

This includes user rewards gifted or issued events triggered as they happen.
*/

// include earned reward information
let rewardId = 'reward-12345'; // Unique identifier for the reward
let rewardDate = '2023-10-01T12:00:00Z'; // Date and time of the reward in ISO 8601 format
let rewardPoints = 200; // Number of points awarded for the reward
let rewardDescription = 'Birthday Reward'; // Description of the reward

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints + rewardPoints; // Customer's updated loyalty points after earning the reward

// create the earned reward event payload
const earnedRewardEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                RewardId: rewardId,
                RewardPoints: rewardPoints,
                RewardDescription: rewardDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName
            },
            time: rewardDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Earned Loyalty Reward'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the earned reward event to Klaviyo
await eventsApi.createEvent(earnedRewardEventPayload)
    .then(response => {
        console.log('Earned Loyalty Reward event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Earned Loyalty Reward event:', error);
    });

/*
create Converted Points to Reward event.

This event is triggered when the points earned by a customer are turned into rewards.
*/

// include converted points information
let convertedPointsId = 'converted-points-12345'; // Unique identifier for the converted points
let convertedPointsDate = '2023-10-01T12:00:00Z'; // Date and time of the converted points in ISO 8601 format
let convertedPoints = 500; // Number of points converted to rewards
let convertedPointsDescription = 'Converted points to rewards'; // Description of the converted points

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints - convertedPoints; // Customer's updated loyalty points after converting points to rewards

// create the converted points event payload
const convertedPointsEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                ConvertedPointsId: convertedPointsId,
                ConvertedPoints: convertedPoints,
                ConvertedPointsDescription: convertedPointsDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName
            },
            time: convertedPointsDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Converted Loyalty Points'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the converted points event to Klaviyo
await eventsApi.createEvent(convertedPointsEventPayload)
    .then(response => {
        console.log('Converted Loyalty Points event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Converted Loyalty Points event:', error);
    });

/*
create Completed Card event.

This event is generated when a customer completes their loyalty card.
*/

// include completed card information
let completedCardId = 'completed-card-12345'; // Unique identifier for the completed card
let completedCardDate = '2023-10-01T12:00:00Z'; // Date and time of the completed card in ISO 8601 format
let completedCardPoints = 1000; // Number of points accumulated in the completed card
let completedCardDescription = 'Completed loyalty card'; // Description of the completed card

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address
customerLoyaltyPoints = customerLoyaltyPoints + completedCardPoints; // Customer's updated loyalty points after completing the card

// create the completed card event payload
const completedCardEventPayload = {
    data: {
        type: 'event',
        attributes: {
            properties: {
                CompletedCardId: completedCardId,
                CompletedCardPoints: completedCardPoints,
                CompletedCardDescription: completedCardDescription,
                RestaurantId: restaurantId,
                RestaurantName: restaurantName
            },
            time: completedCardDate,
            metric: {
                data: {
                    type: 'metric',
                    attributes: {
                        name: 'Completed Loyalty Card'
                    }
                }
            },
            profile: {
                data: {
                    type: 'profile',
                    attributes: {
                        email: customerEmail,
                        properties: {
                            loyaltyPoints: customerLoyaltyPoints
                        }
                    }
                }
            }
        }
    }
};

// send the completed card event to Klaviyo
await eventsApi.createEvent(completedCardEventPayload)
    .then(response => {
        console.log('Completed Loyalty Card event sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending Completed Loyalty Card event:', error);
    });