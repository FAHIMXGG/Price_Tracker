"use client"

import { FormEvent, useState } from "react";

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
    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const isValidLink = isValidAmazonProductURl(searchPrompt)
        if (!isValidLink) return alert("Please enter a valid Amazon Product URL")

        try {
            setIsLoading(true)
        } catch (error) {
            
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <form action="" className='flex flex-warp gap-5 mt-12'
        onSubmit={handleSubmit}>
            <input 
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter product link"
                className="searchbar-input"
            />
            <button type="submit" className="searchbar-btn"
            disabled={searchPrompt ===''}
            >
                {isLoading ? 'searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchBar;