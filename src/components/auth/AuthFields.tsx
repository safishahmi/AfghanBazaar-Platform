import { useState, type ChangeEvent, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';

export const FIELD_INPUT_CLASS =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 transition-shadow focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-navy-700';

const INVALID_CLASS = 'border-navy-900 ring-2 ring-gold-300';
const VALID_CLASS = 'border-slate-300';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, hint, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-navy-900">
          <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  type?: 'text' | 'email' | 'tel';
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal';
  error?: string;
  hint?: string;
}

export function TextField({ id, label, value, onChange, autoComplete, type = 'text', inputMode, error, hint }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        dir="ltr"
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className={`${FIELD_INPUT_CLASS} ${error ? INVALID_CLASS : VALID_CLASS} text-start`}
      />
    </FieldShell>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
}

export function PasswordField({ id, label, value, onChange, autoComplete, error }: PasswordFieldProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          dir="ltr"
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          className={`${FIELD_INPUT_CLASS} ${error ? INVALID_CLASS : VALID_CLASS} pe-12 text-start`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? t('Hide password', 'پنهان کردن رمز عبور') : t('Show password', 'نمایش رمز عبور')}
          aria-pressed={visible}
          className="absolute inset-y-0 end-0 flex w-12 items-center justify-center rounded-e-xl text-slate-600 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  error?: string;
  hint?: string;
}

export function TextAreaField({ id, label, value, onChange, rows = 4, error, hint }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        className={`${FIELD_INPUT_CLASS} ${error ? INVALID_CLASS : VALID_CLASS} resize-y`}
      />
    </FieldShell>
  );
}

interface SelectFieldProps<T extends string> {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  error?: string;
}

export function SelectField<T extends string>({ id, label, value, onChange, options, error }: SelectFieldProps<T>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${FIELD_INPUT_CLASS} ${error ? INVALID_CLASS : VALID_CLASS}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
