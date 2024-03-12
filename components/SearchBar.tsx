"use client"

import { FormEvent, useState } from "react";

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
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
            <button type="submit" className="searchbar-btn">
                Search
            </button>
        </form>
    );
};

export default SearchBar;