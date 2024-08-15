import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: {type: 'string', required: true, unique: true},
    currency : {type: 'string', required: true},
    image: {type: 'string', required: true},
    title: {type: 'string', required: true},
    currentPrice: {type: 'number', required: true},
    originalPrice: {type: 'number', required: true},
    priceHistory: [
        {
            price: {type: 'number', required: true},
            date: {type: Date, default: Date.now}
        },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: 'string'},
    category: { type: 'string'},
    reviewsCount : { type: 'number'},
    isOutOfStock: { type: Boolean, default: false },
    users: [
        {
            email: { type: 'string', required: true}
        }
    ], default: [],
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;