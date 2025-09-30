export const dynamic = "force-dynamic";

import CardWrapper from '@/app/dashboard//contact/cards';
import RevenueChart from '@/app/dashboard/contact/revenue-chart';
//import LatestInvoices from '@/app/dashboard/contact/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
//import { fetchCardData } from '@/app/lib/data'; // Remove fetchLatestInvoices
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Contact
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <form>
            <label>Your message:</label>
                <input type="text" id="message" name="message"></input>
            <label>Your email:</label>
                <input type="email" id="email" name="email"></input>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Send
            </button>
        </form>
      </div>
    </main>
  );
}