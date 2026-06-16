import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartDataset,
  type ChartData,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

// ======================================================
// TYPES
// ======================================================

export type ChartMode = "week" | "month" | "sixMonth" | "custom" | "today";

export interface SalesPerDay {
  date: string;
  day?: number;
  totalSales: number;
}

export interface ExpensePerDay {
  date: string;
  day?: number;
  totalExpense: number;
}

export interface ProfitPerDay {
  date: string;
  day?: number;

  totalSales: number;

  totalExpense: number;

  profit: number;

  profitPercentage: string;
}

export interface SalesPerMonth {
  month: number;
  totalSales: number;
}

export interface ExpensePerMonth {
  month: number;
  totalExpense: number;
}

export interface ReportData {
  startDate?: string;

  endDate?: string;

  salesPerDay?: SalesPerDay[];

  perdaySales?: SalesPerDay[];

  expensePerDay?: ExpensePerDay[];

  perdayExpense?: ExpensePerDay[];

  perdayProfit?: ProfitPerDay[];

  salesPerMonth?: SalesPerMonth[];

  expensePerMonth?: ExpensePerMonth[];
}

// ======================================================
// REGISTER CHART.JS
// ======================================================

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

// ======================================================
// HELPERS
// ======================================================

const normalizeDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const buildDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);

  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return [];
  }

  const range: string[] = [];

  const current = new Date(start);

  while (current <= end) {
    range.push(normalizeDate(current.toISOString()));

    current.setDate(current.getDate() + 1);
  }

  return range;
};

const buildDayLabels = (dates: string[]) =>
  dates.map((date) => new Date(date).getDate().toString());

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

// ======================================================
// PAD DAILY DATA
// ======================================================

type DailyDataItem = SalesPerDay | ExpensePerDay | ProfitPerDay;

const padDailyData = <T extends DailyDataItem, K extends keyof T>(
  dates: string[] = [],
  items: Array<T | undefined | null> = [],
  valueKey: K,
) => {
  const map = new Map<string, number>();

  items.forEach((item) => {
    if (!item?.date) {
      return;
    }

    const normalized = normalizeDate(item.date);

    map.set(normalized, Number(item[valueKey] ?? 0));
  });

  return dates.map((date) => map.get(date) ?? 0);
};

// ======================================================
// CHART OPTIONS
// ======================================================

const options: ChartOptions<"bar" | "line"> = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,

      position: "top",

      labels: {
        boxWidth: 12,

        padding: 16,
      },
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        precision: 0,
      },
    },
  },
};

// ======================================================
// REUSABLE CHART CARD
// ======================================================

type AnalyticsChartProps = {
  title: string;

  type: "bar" | "line";

  labels: string[];

  datasets: ChartDataset<"bar" | "line", number[]>[];
};

function AnalyticsChart({
  title,
  type,
  labels,
  datasets,
}: AnalyticsChartProps) {
  const chartData: ChartData<"bar" | "line", number[], string> = {
    labels,
    datasets,
  };

  return (
    <div className="w-full h-[calc(50vh-20px)] min-h-65 ">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="w-full h-full rounded-2xl bg-white p-4 shadow-md">
        {type === "bar" ? (
          <Bar
            data={chartData as ChartData<"bar", number[], string>}
            options={options}
          />
        ) : (
          <Line
            data={chartData as ChartData<"line", number[], string>}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Charts({
  reportData,
  dataFor,
}: {
  reportData: ReportData;

  dataFor: ChartMode;
}) {
  // ======================================================
  // WEEK DATA
  // ======================================================

  const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklySales = Array<number>(7).fill(0);

  const weeklyProfit = Array<number>(7).fill(0);

  const weeklyExpense = Array<number>(7).fill(0);
  const todayDate = new Date();
  console.log(todayDate);

  safeArray(reportData?.salesPerDay)
    .filter((sale): sale is SalesPerDay => !!sale?.date)
    .forEach((sale) => {
      // const day = new Date(sale.date).getDay();

      const chartIndex = sale.day ? sale.day - 1 : 0;
      console.log(chartIndex, sale?.date);

      weeklySales[chartIndex] = sale.totalSales ?? 0;
    });

  safeArray(reportData?.perdayProfit)
    .filter((profit): profit is ProfitPerDay => !!profit?.date)
    .forEach((profit) => {
      // const day = new Date(profit.date).getDay();

      const chartIndex = profit.day ? profit.day - 1 : 0;

      weeklyProfit[chartIndex] = profit.profit ?? 0;
    });

  safeArray(reportData?.expensePerDay)
    .filter((expense): expense is ExpensePerDay => !!expense?.date)
    .forEach((expense) => {
      // const day = new Date(expense.date).getDay();

      const chartIndex = expense.day ? expense.day - 1 : 0;

      weeklyExpense[chartIndex] = expense.totalExpense ?? 0;
    });
  console.log(
    weeklyExpense,
    "weeklyExpense",
    weeklyProfit,
    "weeklyProfit",
    weeklySales,
    "weeklySales",
  );

  // ======================================================
  // CUSTOM / MONTH DATA
  // ======================================================

  const customRange =
    reportData?.startDate && reportData?.endDate
      ? buildDateRange(reportData.startDate, reportData.endDate)
      : [];

  const customLabels = buildDayLabels(customRange);

  const customSales = padDailyData(
    customRange,

    reportData?.perdaySales || reportData?.salesPerDay || [],

    "totalSales",
  );

  const customProfit = padDailyData(
    customRange,

    reportData?.perdayProfit || [],

    "profit",
  );

  const customExpense = padDailyData(
    customRange,

    reportData?.perdayExpense || reportData?.expensePerDay || [],

    "totalExpense",
  );

  // ======================================================
  // SIX MONTH DATA
  // ======================================================

  const salesPerMonth = safeArray(reportData?.salesPerMonth);

  const expensePerMonth = safeArray(reportData?.expensePerMonth);

  const sixMonthLabels = salesPerMonth.map((month) => {
    const monthNumber = Number(month.month);

    return new Date(0, monthNumber - 1).toLocaleString("en-US", {
      month: "short",
    });
  });

  const sixMonthSales = salesPerMonth.map((month) =>
    Number(month.totalSales ?? 0),
  );

  const sixMonthExpense = expensePerMonth.map((month) =>
    Number(month.totalExpense ?? 0),
  );

  const sixMonthProfit = sixMonthSales.map(
    (sales, index) => sales - (sixMonthExpense[index] ?? 0),
  );

  // ======================================================
  // WEEK CHARTS
  // ======================================================

  if (dataFor === "week" || dataFor === "today") {
    return (
      <div className="grid grid-cols-1  md:grid-cols-2 gap-12">
        <AnalyticsChart
          title="Weekly Sales vs Expense"
          type="bar"
          labels={weekLabels}
          datasets={[
            {
              label: "Sales",

              data: weeklySales,

              backgroundColor: "rgba(59,130,246,0.6)",
            },

            {
              label: "Expense",

              data: weeklyExpense,

              backgroundColor: "rgba(239,68,68,0.6)",
            },
          ]}
        />

        <AnalyticsChart
          title="Weekly Profit"
          type="line"
          labels={weekLabels}
          datasets={[
            {
              label: "Profit",

              data: weeklyProfit,

              borderColor: "rgba(16,185,129,0.9)",

              backgroundColor: "rgba(16,185,129,0.2)",

              tension: 0.3,

              fill: true,
            },
          ]}
        />
      </div>
    );
  }

  // ======================================================
  // MONTH CHARTS
  // ======================================================

  if (dataFor === "month") {
    return (
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <AnalyticsChart
          title="30 Days Sales vs Expense"
          type="bar"
          labels={customLabels}
          datasets={[
            {
              label: "Sales",

              data: customSales,

              backgroundColor: "rgba(59,130,246,0.6)",
            },

            {
              label: "Expense",

              data: customExpense,

              backgroundColor: "rgba(239,68,68,0.6)",
            },
          ]}
        />

        <AnalyticsChart
          title="30 Days Profit"
          type="line"
          labels={customLabels}
          datasets={[
            {
              label: "Profit",

              data: customProfit,

              borderColor: "rgba(16,185,129,0.9)",

              backgroundColor: "rgba(16,185,129,0.2)",

              tension: 0.3,

              fill: true,
            },
          ]}
        />
      </div>
    );
  }

  // ======================================================
  // CUSTOM CHARTS
  // ======================================================

  if (dataFor === "custom") {
    return (
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <AnalyticsChart
          title="Custom Sales vs Expense"
          type="bar"
          labels={customLabels}
          datasets={[
            {
              label: "Sales",

              data: customSales,

              backgroundColor: "rgba(59,130,246,0.6)",
            },

            {
              label: "Expense",

              data: customExpense,

              backgroundColor: "rgba(239,68,68,0.6)",
            },
          ]}
        />

        <AnalyticsChart
          title="Custom Profit"
          type="line"
          labels={customLabels}
          datasets={[
            {
              label: "Profit",

              data: customProfit,

              borderColor: "rgba(16,185,129,0.9)",

              backgroundColor: "rgba(16,185,129,0.2)",

              tension: 0.3,

              fill: true,
            },
          ]}
        />
      </div>
    );
  }

  // ======================================================
  // SIX MONTH CHARTS
  // ======================================================

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <AnalyticsChart
        title="6 Months Sales vs Expense"
        type="bar"
        labels={sixMonthLabels}
        datasets={[
          {
            label: "Sales",

            data: sixMonthSales,

            backgroundColor: "rgba(59,130,246,0.6)",
          },

          {
            label: "Expense",

            data: sixMonthExpense,

            backgroundColor: "rgba(239,68,68,0.6)",
          },
        ]}
      />

      <AnalyticsChart
        title="6 Months Profit"
        type="line"
        labels={sixMonthLabels}
        datasets={[
          {
            label: "Profit",

            data: sixMonthProfit,

            borderColor: "rgba(16,185,129,0.9)",

            backgroundColor: "rgba(16,185,129,0.2)",

            tension: 0.3,

            fill: true,
          },
        ]}
      />
    </div>
  );
}
