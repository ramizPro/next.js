import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';
// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() { // Make component async, remove the props
  const revenue = await fetchRevenue(); // Fetch data inside the component{
  const chartHeight = 350;
  
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Location:
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl overflow-hidden shadow-sm col-span-2 lg:col-span-3 bg-gray-50">
        <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Trg+mladosti+7,+Velenje,+Slovenia&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Open from 8.00 - 16.00, MON - FRI</h3>
        </div>
    </div>
  );
}
