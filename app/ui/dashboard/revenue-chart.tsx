import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchCardData } from '@/app/lib/data';

function parseCurrency(value: string | number): number {
  if (typeof value === 'number') return value;
  return parseFloat(value.replace(/[$,]/g, '')) || 0;
}

export default async function RevenueChart() {

  const revenue = await fetchRevenue();
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  //  Earnings vs Goal
  const { totalPaidInvoices, totalPendingInvoices } = await fetchCardData();

  const goal = 5_000; // lifetime/year goal

  const earned = parseCurrency(totalPaidInvoices as unknown as string);
  const pending = parseCurrency(totalPendingInvoices as unknown as string);
  const combined = earned + pending;

  const earnedPercent = Math.min((earned / goal) * 100, 100);
  const pendingPercent = Math.min((combined / goal) * 100, 100);

  return (
    <div className="w-full md:col-span-4">
      {/* ===== Monthly Revenue Chart ===== */}
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>

      {/* ===== Earnings vs Goal Progress Bar ===== */}
      <h2 className={`${lusitana.className} mt-10 mb-4 text-xl md:text-2xl`}>
        Earnings vs Goal
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-md">
          <div className="w-full bg-gray-200 rounded-md h-8 relative overflow-hidden">
            {/* Earned part */}
            <div
              className="bg-blue-500 h-full absolute left-0 top-0"
              style={{ width: `${earnedPercent}%` }}
            ></div>

            {/* Pending part starts after earned */}
            <div
              className="bg-orange-400 h-full absolute top-0"
              style={{
                left: `${earnedPercent}%`,
                width: `${pendingPercent - earnedPercent}%`,
              }}
            ></div>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            Earned: ${earned.toLocaleString()} | Pending: $
            {pending.toLocaleString()} | Goal: ${goal.toLocaleString()} (
            {Math.round((combined / goal) * 100)}%)
          </div>
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">
            Lifetime of year goal: ${goal.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
}
