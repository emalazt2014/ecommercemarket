import cn from '@/utils/cn';
import { useId, type HTMLProps } from 'react';

type PropsType = Omit<HTMLProps<HTMLInputElement>, 'label'> & {
  label: string;
  required?: boolean;
  errorMessage?: string;
  error?: boolean;
};

export function InputGroup({
  label,
  className,
  error,
  errorMessage,
  ...props
}: PropsType) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block mb-2.5">
        {label} {props?.required && <span className="text-red">*</span>}
      </label>

      <input
        id={id}
        {...props}
        className={cn(
          'rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20',
          className,
          {
            'border-red': error,
          }
        )}
      />

      {error && <p className="text-sm text-red mt-1.5">{errorMessage}</p>}
    </div>
  );
}
