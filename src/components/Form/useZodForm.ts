import { useForm, UseFormProps, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Un hook personnalisé qui combine react-hook-form avec zod pour la validation.
 * Il prend un schéma zod et retourne les méthodes de formulaire de react-hook-form.
 * 
 * @param schema - Le schéma zod pour la validation
 * @param options - Options supplémentaires pour useForm
 * @returns Les méthodes de formulaire de react-hook-form
 */
export function useZodForm<TSchema extends z.ZodType>(
  schema: TSchema,
  options: Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> = {}
) {
  const { defaultValues, ...formOptions } = options;
  
  return useForm<z.infer<TSchema>>({
    ...formOptions,
    defaultValues: defaultValues as DefaultValues<z.infer<TSchema>>,
    resolver: zodResolver(schema),
    mode: options.mode || 'onSubmit',
  });
}