import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { ScrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        connectToDB()

        const products = await Product.find({})

        if (!products) throw new Error("Product not found")

        // scrape product information and update to db
        const updatedProduct = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapedProduct = await ScrapeAmazonProduct(currentProduct.url)

                if (!scrapedProduct) throw new Error("Product not found")

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice }
                ]

                const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory)
                }
                const updatedProduct = await Product.findOneAndUpdate(
                    { url: product.url },
                    product,
                    // { upsert: true, new: true }

                )
                // check each product's status & send email notification

                const emailNotificationType = getEmailNotifType(scrapedProduct, currentProduct)

                if (emailNotificationType && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                    }

                    const emailContent = await generateEmailBody(productInfo, emailNotificationType)
                    const userEmails = updatedProduct.users.map((user: any) => user.email)

                    await sendEmail(emailContent, userEmails)
                }

                return updatedProduct

            })
        )
    
        return NextResponse.json({
            message: 'OK', data: updatedProduct
        })

    } catch (error) {
        throw new Error(`Error in GET : ${error}`);
    }
}