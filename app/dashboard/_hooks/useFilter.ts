import { useState } from "react";

export function useFilter<T>(target: T[], defaultValue: T) {
  const [filter, setFilter] = useState<T>(defaultValue);

  function handleFilterChange(value: T) {
    setFilter(value);
  }

  function isSetFilter(value: T) {
    return filter === value;
  }

  return {
    filter,
    handleFilterChange,
    isSetFilter,
  };
}

export function useMultipleFilter<T>(target: T[], defaultValues: T[]) {
  const [filters, setFilter] = useState<T[]>(defaultValues);

  function handleFilterChange(value: T) {
    if (filters.includes(value)) {
      setFilter(filters.filter((filter) => filter !== value));
    } else {
      setFilter([...filters, value]);
    }
  }

  function isSetFilter(value: T) {
    return filters.includes(value);
  }

  return {
    filters,
    handleFilterChange,
    isSetFilter,
  };
}
