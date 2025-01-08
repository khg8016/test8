import React, { useState } from 'react';
import { BackButton } from './BackButton';
import { PrototypeActions } from './PrototypeActions';
import { PrototypeHeader } from './PrototypeHeader';
import { PrototypeButtons } from './PrototypeButtons';
import { PrototypeContent } from './PrototypeContent';
import { EditPrototypeModal } from '../prototypes/EditPrototypeModal';
import { usePrototypes } from '../../hooks/usePrototypes';
import type { Prototype } from '../../types/prototype';

interface PrototypeDetailProps {
  prototype: Prototype;
  onBack: () => void;
}

export function PrototypeDetail({ prototype: initialPrototype, onBack }: PrototypeDetailProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { refreshPrototypes } = usePrototypes();
  const [prototype, setPrototype] = useState(initialPrototype);

  const handleEditSuccess = async () => {
    const { data: updatedPrototypes } = await refreshPrototypes();
    const updatedPrototype = updatedPrototypes.find(p => p.id === prototype.id);
    if (updatedPrototype) {
      setPrototype(updatedPrototype);
    }
    setIsEditModalOpen(false);
  };

  const handlePreviewClick = () => {
    if (prototype.preview_url) {
      window.open(prototype.preview_url, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton onClick={onBack} />
      
      <PrototypeActions
        prototype={prototype}
        onEdit={() => setIsEditModalOpen(true)}
        onDeleted={onBack}
      />
      
      <PrototypeHeader prototype={prototype} />
      
      <PrototypeButtons 
        previewUrl={prototype.preview_url}
        onPreviewClick={handlePreviewClick}
      />
      
      <PrototypeContent prototype={prototype} />

      <EditPrototypeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        prototype={prototype}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}