"use client"

import { ScrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';


const isValidAmazonProductURl = (url: string) =>{
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        //check
        if (hostname.includes("www.amazon.com") ||
            hostname.includes("amazon.") ||
            hostname.includes("amazon.co.uk") ||
            hostname.includes("amazon.de") ||
            hostname.includes("amazon.es") ||
            hostname.includes("amazon.fr") ||
            hostname.includes("amazon.it") ||
            hostname.endsWith("amazon")
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter(); 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURl(searchPrompt);
        if (!isValidLink) return alert("Please enter a valid Amazon Product URL");

        try {
            setIsLoading(true);
            const productId = await ScrapeAndStoreProduct(searchPrompt);

            if (productId) {
                router.push(`/products/${productId}`);
            } else {
                alert("Failed to scrape product.");
            }
        } catch (error) {
            alert("Something went wrong. Check console.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className='flex flex-warp gap-5 mt-12' onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter product link"
                className="searchbar-input"
            />
            <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};


export default SearchBar;