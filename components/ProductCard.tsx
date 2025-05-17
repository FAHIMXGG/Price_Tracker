import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
            <Link href={`/products/${product._id}`} className='block'>
                <div className='relative h-48 sm:h-56 md:h-64 overflow-hidden'>
                    <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className='object-contain w-full h-full transition-transform duration-300 hover:scale-105'
                    />
                </div>

                <div className='p-4 bg-white'>
                    <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2'>{product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}</h3>

                    <div className='flex justify-between items-center'>
                        <p className='text-gray-500 text-sm md:text-base capitalize'>
                            {product.category}
                        </p>

                        <p className='text-primary font-bold text-sm md:text-base'>
                            <span className="mr-1">{product?.currency}</span>
                            <span>{product?.currentPrice}</span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
