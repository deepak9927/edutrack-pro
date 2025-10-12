"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarksTableProps {
  // Define the props for the table here (e.g., data, columns)
}

const MarksTable: React.FC<MarksTableProps> = ({}) => {
  // Implement the table component here
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto"
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Assignment
            </th>
            <th scope="col" className="px-6 py-3">
              Student
            </th>
            <th scope="col" className="px-6 py-3">
              Marks
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder data - replace with actual data */}
          <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Assignment 1
            </th>
            <td className="px-6 py-4">
              Student A
            </td>
            <td className="px-6 py-4">
              75
            </td>
            <td className="px-6 py-4">
              {/* Add edit/delete buttons here */}
            </td>
          </motion.tr>
          {/* Add more rows for other assignments/students */}
        </tbody>
      </table>
    </motion.div>
  );
};

export default MarksTable;