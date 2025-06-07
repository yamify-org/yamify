import { useFormContext, Controller, ControllerRenderProps, FieldValues, FieldPath, ControllerFieldState } from 'react-hook-form';
import { ReactNode, ReactElement } from 'react';

type RenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
};

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  children: ReactNode | ((props: RenderProps<TFieldValues, TName>) => ReactNode);
};

/**
 * Un composant qui utilise Controller de react-hook-form pour gérer un champ de formulaire.
 * Il permet de passer les propriétés du champ et l'état du champ à un composant enfant.
 */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, children }: FormFieldProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        if (typeof children === 'function') {
          return <>{children({ field, fieldState })}</>;
        }
        return <>{children}</>;
      }}
    />
  );
}