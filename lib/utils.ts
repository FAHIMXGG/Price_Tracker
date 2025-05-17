import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PriceHistoryItem } from "@/types"
import * as cheerio from 'cheerio';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number): string {
  return value.toLocaleString();
}

export function getAveragePrice(priceHistory: PriceHistoryItem[]): number {
  if (priceHistory.length === 0) return 0;
  
  const sum = priceHistory.reduce((total, item) => total + item.price, 0);
  return sum / priceHistory.length;
}

export function getLowestPrice(priceHistory: PriceHistoryItem[]): number {
  if (priceHistory.length === 0) return 0;
  
  return Math.min(...priceHistory.map(item => item.price));
}

export function getHighestPrice(priceHistory: PriceHistoryItem[]): number {
  if (priceHistory.length === 0) return 0;
  
  return Math.max(...priceHistory.map(item => item.price));
}

export function extractPrice(...elements: any[]) {
  for (const element of elements) {
    const text = element.text().trim();
    
    if (text) {
      const cleanPrice = text.replace(/[^\d.]/g, '');
      
      let firstPrice;
      
      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0] || cleanPrice;
        return firstPrice;
      }
    }
  }
  
  return '';
}

export function extractCurrency(element: any) {
  const text = element.text().trim();
  
  if (text) {
    const currency = text.replace(/[0-9,.]/g, '');
    return currency || '$';
  }
  
  return '$';
}

export function extractDescription($: any) {
  // Extract description from Amazon product page
  const selectors = [
    '#productDescription',
    '#feature-bullets',
    '.a-expander-content',
    '#description-text'
  ];
  
  for (const selector of selectors) {
    const element = $(selector);
    if (element.length > 0) {
      return element.text().trim();
    }
  }
  
  return '';
}

