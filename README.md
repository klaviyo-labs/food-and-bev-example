# Food and beverage example

This repo contains code for key events in the food and beverage industry. 

## Important disclaimer
All code samples in this repository show examples of how to accomplish certain use cases. We will use our best effort to maintain these examples, but occasionally some items may break. If you notice a broken code sample, please open an issue to let us know something is broken, or alternatively submit a PR with a proposed fix.

## Version

* Klaviyo Typescript SDK version 18.0.0
* API revision 2025-04-15

## What you'll learn

How to structure key events for food and beverage integrations. We provide the following example events for these kinds of integrations:

* Online ordering
  * Placed Order
  * Ordered Product
  * Fulfilled Order
  * Refunded Order
  * Closed Order
  * Adjusted Order
  * Cancelled Order
* Reservations
  * Created Reservation
  * Confirmed Reservation
  * Completed Reservation
  * Cancelled Reservation
  * No Showed Reservation
* Loyalty
  * Signed Up for Loyalty Program
  * Created Loyalty Redemption
  * Updated Loyalty Redemption
  * Applied Loyalty Redemption
  * Checked In to Loyalty Program
  * Earned Loyalty Reward
  * Converted Loyalty Points
  * Completed Loyalty Card

## Limitations

These example events are written in JavaScript using our server-side Create Event endpoint. They do not represent a real integration; rather, they are just example code snippets you can customize or use for reference when building an actual integration.
We do our best to make sure any code and API references are accurate and current when this is published, but you might need to update code and it’s always a best practice to leverage our [latest API versions](https://developers.klaviyo.com/en/reference/api_overview). If you have questions, feel free to hop over to our [Developer Community](https://community.klaviyo.com/groups/developer-group-64).

## Klaviyo features + endpoints used

* [Create Event endpoint](https://developers.klaviyo.com/en/reference/create_event)
* [Node SDK](https://github.com/klaviyo/klaviyo-api-node)

## Usage

Clone this repository, then locate the appropriate file (online ordering, reservations, or loyalty) in the src folder based on the type of integration you are building. 
Each file contains a list of events that are relevant to that type of integration. Use these events for reference as you build out your integration.
