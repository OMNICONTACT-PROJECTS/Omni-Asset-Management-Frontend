import React, { useState } from 'react';

import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import FilterButton from '../../../components/DropdownFilter';
import Datepicker from '../../../components/Datepicker';
import Banner from '../../../partials/Banner';
import EmployeeTable from '../../../components/EmployeeTable';

function UserTable() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">

            {/* Dashboard actions */}
            <div className="mb-8 sm:flex sm:justify-between sm:items-center">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">Employee Management Table</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" style={{}}>
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>                
              </div>

            </div>

            {/* Cards */}
            <div>

              {/* Line chart (Acme Plus) */}
              <EmployeeTable/>
              {/* Line chart (Acme Advanced) */}
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default UserTable;