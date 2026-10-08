import { Check } from 'lucide-react';
import './choice-options.css';

/** Shared answer controls for practice tests and lesson assignments. */
export function ChoiceOptions({
  name,
  label,
  options,
  value,
  multiple = false,
  correctOptions = [],
  correctLabel = 'Correct answer',
  onChange,
}: {
  name: string;
  label: string;
  options: { id: string; text: string }[];
  value: string;
  multiple?: boolean;
  correctOptions?: (string | undefined)[];
  correctLabel?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={`practice-options${options.some((option) => option.text.length > 20) ? ' practice-options-expanded' : ''}`}
      role={multiple ? 'group' : 'radiogroup'}
      aria-label={label}
    >
      {options.map((option) => {
        const selected = multiple ? value.split(',').includes(option.id) : value === option.id;
        const correct = correctOptions.includes(option.id);
        return (
          <label
            className={`practice-option${selected ? ' selected' : ''}${correct ? ' correct' : ''}`}
            key={option.id}
          >
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={option.id}
              aria-label={option.text}
              checked={selected}
              onChange={() => {
                const existing = value.split(',').filter(Boolean);
                onChange(
                  multiple
                    ? (selected
                        ? existing.filter((id) => id !== option.id)
                        : [...existing, option.id]
                      )
                        .sort()
                        .join(',')
                    : option.id,
                );
              }}
            />
            <span>{option.text}</span>
            {selected && <small>Your answer</small>}
            {correct && (
              <small>
                <Check size={14} aria-hidden="true" /> {correctLabel}
              </small>
            )}
          </label>
        );
      })}
    </div>
  );
}
