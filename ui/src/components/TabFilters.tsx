import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { Button } from '@material-ui/core';
import { AddCircleOutline as AddCircleOutlineIcon } from '@material-ui/icons';
import { FiltersItem } from './FiltersItem';
import { Test, Filter } from '../types';
import { FilterSelector } from './FilterSelector';
import { FiltersPlaceholder } from './FiltersPlaceholder';

const rootStyles = css``;

const placeholderWrapperStyles = css`
  margin-bottom: 16px;
`;

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
    const updatedFilters = test.filters.filter((filter, index) => filterIndex !== index);
    onTestUpdated({ ...test, filters: updatedFilters });
  };

  const handleUpdateFilter = (filterIndex: number, selectedOptionIds: string) => {
    const updatedFilters = test.filters.map((filter, index) => (filterIndex === index ? { ...filter, selectedOptionIds } : filter));
    onTestUpdated({ ...test, filters: updatedFilters });
  };

  const handleAddFilter = (filterId: string) => {
    if (filterId) {
      onTestUpdated({ ...test, filters: [...test.filters, { filterId, selectedOptionIds: [] }] });
    }
    setIsAdding(false);
  };

  return (
    <div className={rootStyles}>
      {derivedFilters.length === 0 ? (
        <div className={placeholderWrapperStyles}>
          <FiltersPlaceholder />
        </div>
      ) : (
        derivedFilters.map((derivedFilter, index) => (
          <FiltersItem index={index} filter={derivedFilter} isEditing={isEditing} onFilterUpdated={handleUpdateFilter} onFilterDeleted={handleDeleteFilter} />
        ))
      )}
      {isAdding && <FilterSelector filters={filters} onCancel={() => setIsAdding(false)} onSelect={handleAddFilter} />}
      <Button disabled={!isEditing} startIcon={<AddCircleOutlineIcon />} color="primary" variant="contained" onClick={() => setIsAdding(true)}>
        Add Filter
      </Button>
    </div>
  );
};
