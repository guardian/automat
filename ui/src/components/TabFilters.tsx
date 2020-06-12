import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon } from '@material-ui/icons';
import { FiltersItem } from './FiltersItem';
import { Test, Filter, TestFilter } from '../types';
import { FilterSelector } from './FilterSelector';

const rootStyles = css``;

type Props = {
  test: Test;
  filters: Filter[];
  isEditing: boolean;
  onTestUpdated: Function;
};

export const TabFilters = ({ test, filters, isEditing, onTestUpdated }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [derivedFilters, setDerivedVariants] = useState([] as Filter[]);

  useEffect(() => {
    const derivedFilters = test.filters
      .map((dF) => {
        const extendedFilter = filters.find((f) => dF.filterId === f.id);
        return { ...extendedFilter, selectedOptionIds: dF.selectedOptionIds };
      })
      .filter((dF) => dF);
    setDerivedVariants(derivedFilters as Filter[]);
  }, [test, filters]);

  const handleDeleteFilter = (filterIndex: number) => {
    const updatedDerivedFilters = derivedFilters.filter((dF: Filter, index: number) => filterIndex !== index);
    const testFilters = updatedDerivedFilters.map((dF) => {
      const testFilter: TestFilter = {
        filterId: dF.id,
        selectedOptionIds: [],
      };
      return testFilter;
    });
    onTestUpdated({ ...test, filters: testFilters });
  };

  const handleUpdateFilter = (filterIndex: number, selectedOptionId: string) => {
    console.log('=== handleUpdateFilter: ');
  };

  const handleAddFilter = (filterId: string) => {
    if (filterId) {
      onTestUpdated({ ...test, filters: [...test.filters, { filterId, selectedOptionIds: [] }] });
    }
    setIsAdding(false);
  };

  return (
    <div className={rootStyles}>
      {derivedFilters.map((derivedFilter, index) => (
        <FiltersItem
          index={index}
          filter={derivedFilter}
          test={test}
          isEditing={isEditing}
          onFilterUpdated={handleUpdateFilter}
          onFilterDeleted={handleDeleteFilter}
        />
      ))}
      {isAdding && <FilterSelector filters={filters} onCancel={() => setIsAdding(false)} onSelect={handleAddFilter} />}
      <Button disabled={!isEditing} startIcon={<AddCircleOutlineIcon />} color="primary" variant="contained" onClick={() => setIsAdding(true)}>
        Add Filter
      </Button>
    </div>
  );
};
