import { ReactNode } from 'react';
import { FormProvider as HookFormProvider, UseFormReturn } from 'react-hook-form';

type FormProviderProps = {
  children: ReactNode;
  methods: UseFormReturn<any>;
};

/**
 * Un wrapper autour du FormProvider de react-hook-form
 * qui fournit le contexte du formulaire à tous les composants enfants.
 */
export function FormProvider({ children, methods }: FormProviderProps) {
  return <HookFormProvider {...methods}>{children}</HookFormProvider>;
}