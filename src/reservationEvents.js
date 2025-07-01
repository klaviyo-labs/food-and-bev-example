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
create Created Reservation event,

This event occurs when a guest starts the reservation process.
This is the most important value to bring in with a reservation platform.
*/

// include reservation information
const reservationCreatedDate = '2024-10-03T19:00:00Z'; // Date and time of the reservation in ISO 8601 format
const reservationScheduledTime = '2024-09-07T19:00:00Z'; // Scheduled time of the reservation in ISO 8601 format
const reservedTableNumber = 'Table 5'; // Reserved table number or identifier
const partySize = 4; // Number of people in the reservation
const reservationTags = ['birthday', 'VIP']; // Tags or notes associated with the reservation
const reservationId = 'reservation-12345'; // Unique identifier for the reservation
const reservationSource = 'website'; // Source of the reservation (e.g., website, app, phone)
const reservationNotes = 'Window seat preferred'; // Additional notes or preferences for the reservation

// include restaurant information
let restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
let restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
let customerEmail = 'customer email'; // Customer's email address
let firstName = 'John'; // Customer's first name
let lastName = 'Doe'; // Customer's last name   
let phoneNumber = '123-456-7890'; // Customer's phone number in E.164 format

// create the event payload for the Created Reservation event
const createdReservationPayload = {
  data: {
    type: "event",
    attributes: {
      properties: {
        ReservationScheduledTime: reservationScheduledTime,
        ReservedTableNumber: reservedTableNumber,
        PartySize: partySize,
        ReservationSource: reservationSource,
        ReservationNotes: reservationNotes,
        ReservationTags: reservationTags,
        ReservationId: reservationId,
        RestaurantId: restaurantId,
        RestaurantName: restaurantName
      },
      time: reservationCreatedDate, 
      metric: {
        data: {
          type: "metric",
          attributes: {
            name: "Created Reservation"
          }
        }
      },
      profile: {
        data: {
          type: "profile",
          attributes: {
            email: customerEmail,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber
          }
        }
      }
    }
  }
};

// create the Created Reservation event
await eventsApi.createEvent(createdReservationPayload)
  .then(response => {
    console.log('Created Reservation event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Created Reservation event:', error);
  });

/*
create Confirmed Reservation event.

This event occurs when a guest confirms their reservation.
*/

// include reservation information
const reservationConfirmedDate = '2023-10-01T19:00:00Z'; // Date and time of the reservation confirmation in ISO 8601 format
const reservationConfirmedId = 'reservation-12345'; // Unique identifier for the confirmed reservation
const confirmationMethod = 'email'; // Method of confirmation (e.g., email, phone, app)
const confirmedResScheduledTime = '2023-10-01T19:00:00Z'; // Confirmed scheduled time of the reservation in ISO 8601 format
const confirmedReservationPartySize = 4; // Number of people in the confirmed reservation

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address

// create the event payload for the Confirmed Reservation event
const confirmedReservationPayload = {
  data: {
    type: "event",
    attributes: {
      properties: {
        ReservationConfirmedId: reservationConfirmedId,
        ConfirmationMethod: confirmationMethod,
        ReservationTime: confirmedResScheduledTime,
        PartySize: confirmedReservationPartySize,
        RestaurantId: restaurantId,
        RestaurantName: restaurantName
      },
      time: reservationConfirmedDate, 
      metric: {
        data: {
          type: "metric",
          attributes: {
            name: "Confirmed Reservation"
          }
        }
      },
      profile: {
        data: {
          type: "profile",
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// send the Confirmed Reservation event to Klaviyo
await eventsApi.createEvent(confirmedReservationPayload)
  .then(response => {
    console.log('Confirmed Reservation event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Confirmed Reservation event:', error);
  });

/*
create Completed Reservation event.

This event occurs when a guest is checked into the restaurant after arriving for their reservation.
*/

// include reservation information
const completedReservationScheduledTime = '2023-10-01T19:00:00Z'; // Scheduled time of the reservation in ISO 8601 format
const completedReservationId = 'reservation-12345'; // Unique identifier for the reservation
const checkInTime = '2023-10-01T19:05:00Z'; // Time when the guest checked in for the reservation in ISO 8601 format
const checkInMethod = 'app'; // Method of check-in (e.g., app, host, kiosk)
const completedReservationPartySize = 4; // Number of people in the completed reservation

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant 

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address

// create the event payload for the Completed Reservation event
const completedReservationPayload = {
  data: {
    type: "event",
    attributes: {
      properties: {
        ReservationScheduledTime: completedReservationScheduledTime,
        ReservationId: completedReservationId,
        CheckInMethod: checkInMethod,
        PartySize: completedReservationPartySize,
        RestaurantId: restaurantId,
        RestaurantName: restaurantName
      },
      time: checkInTime, 
      metric: {
        data: {
          type: "metric",
          attributes: {
            name: "Completed Reservation"
          }
        }
      },
      profile: {
        data: {
          type: "profile",
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// create the Completed Reservation event
await eventsApi.createEvent(completedReservationPayload)
  .then(response => {
    console.log('Completed Reservation event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Completed Reservation event:', error);
  });

/* 
create Cancelled Reservation event.

This event occurs when a guest cancels their reservation.
*/

// include reservation information
const reservationCancelledDate = '2023-10-01T19:00:00Z'; // Date and time of the reservation cancellation in ISO 8601 format
const cancellationReason = 'change of plans'; // Reason for the cancellation
const cancellationMethod = 'app'; // Method of cancellation (e.g., app, phone, website)
const cancelledResScheduledTime = '2023-10-01T19:00:00Z'; // Scheduled time of the reservation in ISO 8601 format
const cancelledResPartySize = 4; // Number of people in the cancelled reservation

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address

// create the event payload for the Cancelled Reservation event
const cancelledReservationPayload = {
  data: {
    type: "event",
    attributes: {
      properties: {
        CancellationReason: cancellationReason,
        CancellationMethod: cancellationMethod,
        CancelledResScheduledTime: cancelledResScheduledTime,
        CancelledResPartySize: cancelledResPartySize,
        RestaurantId: restaurantId,
        RestaurantName: restaurantName
      },
      time: reservationCancelledDate,
      metric: {
        data: {
          type: "metric",
          attributes: {
            name: "Cancelled Reservation"
          }
        }
      },
      profile: {
        data: {
          type: "profile",
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// create the Cancelled Reservation event
await eventsApi.createEvent(cancelledReservationPayload)
  .then(response => {
    console.log('Cancelled Reservation event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating Cancelled Reservation event:', error);
  });

/*
create No Show Reservation event.

This event occurs when a guest is not checked in for their reservation at the restaurant after the specified reservation time.
*/

// include reservation information
const noShowReservationScheduledTime = '2023-10-01T19:00:00Z'; // Scheduled time of the reservation in ISO 8601 format
const noShowReservationId = 'reservation-12345'; // Unique identifier for the reservation
const noShowReservationSource = 'website'; // Source of the reservation (e.g., website, app, phone)
const noShowTime = '2023-10-01T19:15:00Z'; // Time when the guest was marked as a no-show in ISO 8601 format
const noShowReservationPartySize = 4; // Number of people in the no-show reservation

// include restaurant information
restaurantId = 'restaurant-12345'; // Unique identifier for the restaurant
restaurantName = 'Klaviyo Cafe (Denver)'; // Name of the restaurant

// include profile information to associate the event with a user profile in Klaviyo
customerEmail = 'customer email'; // Customer's email address

// create the event payload for the No Show Reservation event
const noShowReservationPayload = {
  data: {
    type: "event",
    attributes: {
      properties: {
        ReservationScheduledTime: noShowReservationScheduledTime,
        ReservationId: noShowReservationId,
        ReservationSource: noShowReservationSource,
        NoShowReservationPartySize: noShowReservationPartySize,
        RestaurantId: restaurantId,
        RestaurantName: restaurantName
      },
      time: noShowTime,
      metric: {
        data: {
          type: "metric",
          attributes: {
            name: "No Show Reservation"
          }
        }
      },
      profile: {
        data: {
          type: "profile",
          attributes: {
            email: customerEmail
          }
        }
      }
    }
  }
};

// create the No Show Reservation event
await eventsApi.createEvent(noShowReservationPayload)
  .then(response => {
    console.log('No Show Reservation event created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating No Show Reservation event:', error);
  });