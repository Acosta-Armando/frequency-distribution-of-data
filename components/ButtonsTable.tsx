import React, { FC } from 'react';
import Button from './ui/Button'; // Custom Button component
import { DirectDataFrequency, GroupedDataFrequency } from '@/interface'; // Interfaces for data structures

/**
 * Props for the ButtonsTable component.
 * @interface ButtonsTableProps
 * @property {() => void} handleCreateDirectTable - Function to call when "Create Direct Data Table" button is clicked.
 * @property {() => void} handleCreateGroupedTable - Function to call when "Create Grouped Data Table" button is clicked.
 * @property {() => void} handleClear - Function to call when "Clear All" button is clicked.
 * @property {string} [className] - Optional CSS class names to apply to the container section.
 * @property {Array<DirectDataFrequency>} directDataResults - The current results for the direct data table. Used for conditional rendering.
 * @property {Array<GroupedDataFrequency>} groupedDataResults - The current results for the grouped data table. Used for conditional rendering.
 */
interface ButtonsTableProps {
  handleCreateDirectTable: () => void;
  handleCreateGroupedTable: () => void;
  handleClear: () => void;
  className?: string;
  directDataResults: Array<DirectDataFrequency>;
  groupedDataResults: Array<GroupedDataFrequency>;
}

/**
 * ButtonsTable component renders a set of control buttons for managing the frequency tables.
 * It provides options to create direct or grouped data tables and to clear all data,
 * with buttons conditionally displayed based on the current state of the tables.
 *
 * @param {ButtonsTableProps} props - The properties passed to the component.
 */
const ButtonsTable: FC<ButtonsTableProps> = ({
  handleCreateDirectTable,
  handleCreateGroupedTable,
  handleClear,
  className = 'flex', // Default class for flexibility
  directDataResults,
  groupedDataResults,
}) => {
  return (
    <section
      className={`flex flex-col md:flex-row gap-2 items-center ${
        className ?? '' // Apply custom class names if provided
      }`}
    >
      {/* Button to create Direct Data Table */}
      {/* This button is shown only if the directDataResults array is empty,
          meaning the direct table has not yet been created. */}
      {directDataResults.length === 0 && (
        <Button
          type={'button'}
          onClick={handleCreateDirectTable}
          className='w-full md:w-fit'
        >
          Create Direct Data Table
        </Button>
      )}

      {/* Button to create Grouped Data Table */}
      {/* This button is shown only if the groupedDataResults array is empty,
          meaning the grouped table has not yet been created. */}
      {groupedDataResults.length === 0 && (
        <Button
          type={'button'}
          onClick={handleCreateGroupedTable}
          className='w-full md:w-fit'
        >
          Create Grouped Data Table
        </Button>
      )}

      {/* Button to Clear All Data */}
      {/* This button is always available to reset the application state. */}
      <Button type={'reset'} onClick={handleClear} className='w-full md:w-fit'>
        Clear All
      </Button>
    </section>
  );
};

export default ButtonsTable;