'use client';

import { z } from 'zod';
import { FormProvider, FormField, useZodForm } from '@/components/Form';
import { SelectWorkspace } from '@/types/server';

// Définition du schéma de validation avec Zod
const yamSchema = z.object({
  name: z
    .string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .refine(name => /^[a-z0-9-]+$/.test(name), {
      message: 'Le nom ne peut contenir que des lettres minuscules, des chiffres et des tirets',
    }),
  description: z
    .string()
    .max(200, 'La description ne peut pas dépasser 200 caractères')
    .optional(),
  workspaceId: z.string().uuid('Veuillez sélectionner un espace de travail valide'),
});

// Type inféré à partir du schéma Zod
type YamFormValues = z.infer<typeof yamSchema>;

type YamFormProps = {
  onSubmit: (data: YamFormValues) => void;
  workspaces: SelectWorkspace[];
  defaultValues?: Partial<YamFormValues>;
};

export function YamForm({ onSubmit, workspaces, defaultValues }: YamFormProps) {
  // Utilisation de notre hook personnalisé avec le schéma Zod
  const methods = useZodForm(yamSchema, {
    defaultValues: {
      name: '',
      description: '',
      workspaceId: workspaces.length > 0 ? workspaces[0].id : '',
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
                Nom du Yam
              </label>
              <input
                {...field}
                id="name"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="mon-yam"
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Le nom ne peut contenir que des lettres minuscules, des chiffres et des tirets.
              </p>
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
                placeholder="Description du Yam"
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        </FormField>

        <FormField name="workspaceId">
          {({ field, fieldState }) => (
            <div>
              <label htmlFor="workspaceId" className="block text-sm font-medium mb-1">
                Espace de travail
              </label>
              <select
                {...field}
                id="workspaceId"
                className="w-full p-2 border rounded-md"
              >
                {workspaces.map((workspace) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
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
            {methods.formState.isSubmitting ? 'Création...' : 'Créer le Yam'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}