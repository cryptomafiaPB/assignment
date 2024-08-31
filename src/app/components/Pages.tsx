import { Page, PageStats } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Pages({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) {
  const [pages, setPages] = useState<Page[]>([]);
  const [pageStats, setPageStats] = useState<PageStats>({
    page_follows: 0,
    page_post_engagements: 0,
    page_fans: 0,
    page_views_total: 0,
  });
  const [selectedPageId, setSelectedPageId] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.post("/api/pages", {
        accessToken,
      });
      setPages(response.data.data);
    };
    fetchPages();
  }, [accessToken]);

  const fetchPageStats = async (accessToken: string) => {
    if (!startDate || !endDate) {
      window.alert("Please select both start and end dates.");
      return;
    }

    const since = new Date(startDate).toISOString().split("T")[0];
    const until = new Date(endDate).toISOString().split("T")[0];
    const period = "total_over_range";

    try {
      const response = await axios.post("/api/pagestats", {
        userId,
        selectedPageId,
        accessToken,
        since,
        until,
        period,
      });
      console.log("since, until, period :", since, until, period);
      const data = response.data.data.reduce((acc: any, item: any) => {
        const metricName = item.name;
        const latestValue = item.values[item.values.length - 1].value;
        acc[metricName] = latestValue;
        return acc;
      }, {});

      setPageStats(data);
      setLoading(false);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        window.alert("Error fetching post");
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchPageStats(accessToken);
        }}
        className="flex items-center m-4 relative gap-2"
      >
        <select
          value={selectedPageId}
          onChange={(e) => setSelectedPageId(e.target.value)}
          className="bg-gray-50 border mr-2 duration-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select a page</option>
          {pages.map((page: any) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-50 border duration-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-50 border duration-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-lg duration-100 hover:text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!selectedPageId || !startDate || !endDate}
        >
          Submit
        </button>
        {/* <button
          type="submit"
          className="bg-blue-500 text-lg duration-100 hover:text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!selectedPageId}
        >
          Submit
        </button> */}
      </form>
      <h2 className="text-2xl font-bold mb-4 text-center">Page Insights</h2>
      {loading ? (
        <>
          <div className="text-zinc-500 text-center text-base">
            Select page to get page statisctics.
          </div>
        </>
      ) : (
        <div className="grid grid-cols gap-4">
          <div className="bg-zinc-800 items-center p-2 rounded-lg flex flex-col justify-center hover:bg-zinc-900 duration-100 cursor-pointer">
            <h3 className="text-lg font-semibold text-white">
              Total Followers
            </h3>
            <p className="text-3xl font-bold text-white text-center">
              {pageStats.page_follows}
            </p>
          </div>
          <div className="bg-zinc-800 items-center p-2 rounded-lg flex flex-col justify-center hover:bg-zinc-900 duration-100 cursor-pointer">
            <h3 className="text-lg font-semibold text-white">
              Total Engagement
            </h3>
            <p className="text-3xl font-bold text-white text-center">
              {pageStats.page_post_engagements}
            </p>
          </div>
          <div className="bg-zinc-800 p-4 items-center rounded-lg flex flex-col justify-center hover:bg-zinc-900 duration-100 cursor-pointer">
            <h3 className="text-lg font-semibold text-white">
              Views this Week
            </h3>
            <p className="text-3xl font-bold text-white text-center">
              {pageStats.page_views_total}
            </p>
          </div>
          <div className="bg-zinc-800 p-2 items-center rounded-lg flex flex-col justify-center hover:bg-zinc-900 duration-100 cursor-pointer">
            <h3 className="text-lg font-semibold text-white">Total Likes</h3>
            <p className="text-3xl font-bold text-white text-center">
              {pageStats.page_fans}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pages;
