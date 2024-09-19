# subscription_page

## Server Documentation

### Backend Environment Variables

Create a `.env.local` file in the backend root directory and add the following:

```bash
#== Payment configurations
STRIPE_API_KEY=your-stripe-api-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

#== Database configuration
DATABASE_URL=mongodb://localhost:27017/mydatabase

#== Environment and Port
NODE_ENV=development
PORT=3000
```

---

Make sure you have the backend configured with:

- **Stripe API Key**: Get it from your Stripe dashboard.
- **MongoDB**: Either use a local MongoDB instance or set up MongoDB Atlas and replace the `DATABASE_URL` in `.env.local`.

To run the backend:

```bash
npm start
```

### Base URL: `http://localhost:3000/subscription`

---


### **1. Get Prices**
- **Endpoint**: `GET /prices`
- **Description**: Fetches a list of available prices for the subscription service.
- **Response**: 
  - `200 OK`: Returns the list of Stripe prices.
  - **Response body**: 
    ```json
    {
      "object": "list",
      "data": [
        {
          "id": "price_123",
          "object": "price",
          "currency": "usd",
          "unit_amount": 1000,
          "product": "prod_123"
        }
      ]
    }
    ```

---

### **2. Get Price by ID**
- **Endpoint**: `GET /prices/:id`
- **Description**: Fetches a specific price by its ID.
- **Parameters**: 
  - `id` (path parameter): The ID of the price to retrieve.
- **Response**:
  - `200 OK`: Returns the price details.
  - **Response body**:
    ```json
    {
      "id": "price_123",
      "object": "price",
      "currency": "usd",
      "unit_amount": 1000,
      "product": "prod_123"
    }
    ```
  - `404 Not Found`: If the price is not found.

---

### **3. Get Checkout Session**
- **Endpoint**: `GET /checkout_sessions`
- **Description**: Retrieves the details of a Stripe checkout session.
- **Parameters**: 
  - `session_id` (query parameter): The session ID for which details are being retrieved.
- **Response**:
  - `200 OK`: Returns the status and customer email of the session.
  - **Response body**:
    ```json
    {
      "status": "complete",
      "customer_email": "customer@example.com"
    }
    ```
  - `400 Bad Request`: If the session ID is invalid or missing.
  - `500 Internal Server Error`: If an error occurs.

---

### **4. Create Checkout Session**
- **Endpoint**: `POST /checkout_sessions`
- **Description**: Creates a new subscription checkout session.
- **Request body**:
  - `user`: An object containing user details such as `name` and `email`.
  - `priceId`: The ID of the price to be used for the subscription.
  - **Request body example**:
    ```json
    {
      "user": {
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "priceId": "price_123"
    }
    ```
- **Response**:
  - `201 OK`: Returns the newly created Stripe checkout session.
  - **Response body**:
    ```json
    {
      "id": "cs_test_123",
      "object": "checkout.session",
      "status": "open"
    }
    ```
  - `400 Bad Request`: If the request is invalid.
  - `500 Internal Server Error`: If an error occurs.

## Next js installation


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/emrankamil/subscription_page.git
cd your-repo-name
```

### Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (running on localhost or use your own MongoDB Atlas URL)
- Stripe account for payment integration

---

## Installation

### Install Dependencies

```bash
npm install
```

---

## Running the App

### Development Server

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---


### Frontend Environment Variables

Create a `.env` file in the root directory for Next.js:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```
