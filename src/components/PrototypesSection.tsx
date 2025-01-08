import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { PrototypeCategories } from './PrototypeCategories';
import { PrototypeGrid } from './PrototypeGrid';
import { PrototypeDetail } from './PrototypeDetail/PrototypeDetail';
import { PrototypeActions } from './prototypes/PrototypeActions';
import { useFilteredPrototypes } from '../hooks/useFilteredPrototypes';

export function PrototypesSection() {
  const [selectedPrototype, setSelectedPrototype] = useState<string | null>(null);
  const {
    prototypes,
    loading,
    error,
    refreshPrototypes,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useFilteredPrototypes();

  const handlePrototypeSuccess = () => {
    refreshPrototypes();
  };

  const handleBack = async () => {
    await refreshPrototypes();
    setSelectedPrototype(null);
  };

  const currentPrototype = selectedPrototype 
    ? prototypes.find(p => p.id === selectedPrototype)
    : null;

  if (selectedPrototype && currentPrototype) {
    return (
      <PrototypeDetail
        prototype={currentPrototype}
        onBack={handleBack}
      />
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <PrototypeActions onSuccess={handlePrototypeSuccess} />
      </div>
      
      <PrototypeCategories
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <PrototypeGrid 
        prototypes={prototypes}
        loading={loading}
        error={error}
        onPrototypeSelect={(id) => setSelectedPrototype(id)}
      />
    </section>
  );
}