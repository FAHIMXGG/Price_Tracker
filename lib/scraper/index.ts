import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from "../utils";
import test from "node:test";

export async function ScrapeAmazonProduct(url: string){
    if(!url) return


    //brightData configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io:22225',
        port,
        rejectUnauthorized: false,
    }

    try {
        // fetch the product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price'),
            // $('.a-price.a-price-whole'),
            // $('.a-price.a-offscreen'),
            // $('.a-section .a-text-price .a-spacing-none'),
        );

        const originalPrice = extractPrice(
            // $('a.a-size-small'),
            // $('#priceblock_ourprice'),
            // $('#a-size-small'),
            // $('.a-Princess_Sofia.a-text-price Span.a-offscreen'),
            // $('#listPrice'),
            // $('#priceblock_dealprice'),
            // $('.a-size-base.a-color-price')

            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )

        const images =
         $('#imgBlkFront').attr('data-a-dynamic-image') || 
         $('#landingImage').attr('data-a-dynamic-image')||
         '{}';
        
        const imageUrls = Object.keys(JSON.parse(images))
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "")
        const description = extractDescription($)

        // console.log({title, currentPrice, originalPrice, outOfStock, imageUrls, currency, discountRate})
        //data object information
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }
        console.log(data)
        return data;
    } catch (error:any) {
        throw new Error(`Failed to scrape Amazon Product: ${error.message}`)
    }
}