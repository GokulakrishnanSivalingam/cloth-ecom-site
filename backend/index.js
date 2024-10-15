const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: 'rzp_test_XVmaUDhJseyPRW',
    key_secret: 'hhaPmwqXCRIPEKGdhaP12bpA',
});


app.post('/create-order', async(req, res) => {
    const amount = req.body.amount;
    const options = {
        amount: amount,
        currency: 'INR',
        receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Payment verification route (this is your provided code)
app.post('/verify-payment', (req, res) => {
    const secret = 'hhaPmwqXCRIPEKGdhaP12bpA';

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id);
    const digest = shasum.digest('hex');

    if (digest === req.body.razorpay_signature) {
        // Payment verified successfully
        res.status(200).json({ status: 'Payment verified successfully' });
    } else {
        // Payment verification failed
        res.status(400).json({ status: 'Payment verification failed' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));