import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import React from "react";

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-4 sm:px-6 md:px-20 py-12 sm:py-16 md:py-24 border-t border-red-500">
        <div className="flex flex-col xl:flex-row gap-8 md:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text text-sm md:text-base">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text text-4xl sm:text-5xl md:text-6xl">
              Unleash the Power of
              <span className="text-primary"> PriseTracker</span>
            </h1>

            <p className="mt-4 md:mt-6 text-base md:text-lg">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <SearchBar />
          </div>

          <HeroCarousel />
        </div>
      </section>
      <section className="px-4 sm:px-6 md:px-20 py-12 sm:py-16 md:py-24">
        <h2 className="section-text text-2xl md:text-[32px] mb-6 md:mb-8">Trending</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-6 md:gap-8 lg:gap-14">
          {allProducts
            ?.slice(-12)
            .reverse()
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;


