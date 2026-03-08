'use client';

import { useState, useTransition } from 'react';

export type ActionResponse<T = any> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
};

export function useFormAction<T>(action: (formData: FormData) => Promise<ActionResponse<T>>) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResponse<T> | null>(null);

  const executeAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await action(formData);
        setState(result);
      } catch (e) {
        setState({
          success: false,
          message: "Une erreur inattendue est survenue.",
        });
      }
    });
  };

  return {
    isPending,
    state,
    executeAction,
    resetState: () => setState(null),
  };
}
