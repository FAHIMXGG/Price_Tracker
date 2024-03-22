"use server"

import { ScrapeAmazonProduct } from "../scraper"

export async function ScrapeAndStoreProduct(productUrl: string){
    if (!productUrl) return

    try {
        const scrapedProduct = await ScrapeAmazonProduct(productUrl)
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}