const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// Define a route for processing payments
app.post('/charge', async (req, res) => {
    try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // The amount in cents
            currency: 'usd', // Change to your preferred currency
            description: 'Vehicle Rental Payment',
            payment_method_types: ['card'],
        });

        // Send the client secret to the client to confirm the payment
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment failed' });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
