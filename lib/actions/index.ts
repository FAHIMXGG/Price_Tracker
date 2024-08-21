"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { ScrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function ScrapeAndStoreProduct(productUrl: string){
    if (!productUrl) return

    try {
    connectToDB();
    const scrapedProduct = await ScrapeAmazonProduct(productUrl)

    if (!scrapedProduct) return;
    let product = scrapedProduct;
    const exportedProduct = await Product.findOne({ url: scrapedProduct.url })

    if (exportedProduct) {
        const updatedPriceHistory : any = [
            ...exportedProduct.priceHistory,
            {price: scrapedProduct.currentPrice}
        ]

        product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory)
        }
    }
    const newProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
         product,
        { upsert: true, new: true }

    )
    revalidatePath(`/products/${newProduct._id}`)

    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}

export async function getProductById(productID: string) {
    try {
        connectToDB()

        const product = await Product.findOne({_id: productID})

        if(!product) return null;

        return product;
    } catch (error) {
        console.log(error)
    }
}

export async function getAllProducts() {
    try {
        connectToDB()

        const products = await Product.find()

        return products;
    } catch (error) {
        console.log(error)
    }
}