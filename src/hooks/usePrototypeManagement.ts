import { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { createPrototype } from '../services/prototypes/createPrototype';
import { updatePrototype } from '../services/prototypes/updatePrototype';
import { deletePrototype } from '../services/prototypes/deletePrototype';
import type { PrototypeInput } from '../types/prototype';

export function usePrototypeManagement() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  return {
    loading,
    createPrototype: async (input: PrototypeInput) => {
      setLoading(true);
      try {
        return await createPrototype(input, user);
      } finally {
        setLoading(false);
      }
    },
    updatePrototype: async (id: string, input: PrototypeInput) => {
      setLoading(true);
      try {
        return await updatePrototype(id, input, user);
      } finally {
        setLoading(false);
      }
    },
    deletePrototype: async (id: string) => {
      setLoading(true);
      try {
        return await deletePrototype(id, user);
      } finally {
        setLoading(false);
      }
    }
  };
}