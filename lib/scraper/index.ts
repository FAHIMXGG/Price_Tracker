import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice } from "../utils";

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

        console.log({title, currentPrice, originalPrice, outOfStock, imageUrls})
        
    } catch (error:any) {
        throw new Error(`Failed to scrape Amazon Product: ${error.message}`)
    }
}