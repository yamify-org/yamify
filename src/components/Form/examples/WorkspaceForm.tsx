'use client';

import { z } from 'zod';
import { FormProvider, FormField, useZodForm } from '@/components/Form';

// Définition du schéma de validation avec Zod
const workspaceSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  description: z
    .string()
    .max(200, 'La description ne peut pas dépasser 200 caractères')
    .optional(),
});

// Type inféré à partir du schéma Zod
type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

type WorkspaceFormProps = {
  onSubmit: (data: WorkspaceFormValues) => void;
  defaultValues?: Partial<WorkspaceFormValues>;
};

export function WorkspaceForm({ onSubmit, defaultValues }: WorkspaceFormProps) {
  // Utilisation de notre hook personnalisé avec le schéma Zod
  const methods = useZodForm(workspaceSchema, {
    defaultValues: {
      name: '',
      description: '',
      ...defaultValues,
    },
  });

  return (
    <FormProvider methods={methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="name">
          {({ field, fieldState }) => (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nom de l'espace de travail
              </label>
              <input
                {...field}
                id="name"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Mon espace de travail"
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        </FormField>

        <FormField name="description">
          {({ field, fieldState }) => (
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description (optionnelle)
              </label>
              <textarea
                {...field}
                id="description"
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Description de l'espace de travail"
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        </FormField>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? 'Création...' : 'Créer l\'espace de travail'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}