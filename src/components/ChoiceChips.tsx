"use client";

type Option<T extends string> = { id: T; label: string };

type SingleProps<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (id: T) => void;
  multiple?: false;
};

type MultiProps<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T[];
  onChange: (ids: T[]) => void;
  multiple: true;
  hint?: string;
};

/** Pill buttons instead of native selects. Single choice (radio) or several (checkbox). */
export function ChoiceChips<T extends string>(props: SingleProps<T> | MultiProps<T>) {
  const { label, options } = props;
  const isOn = (id: T) => (props.multiple ? props.value.includes(id) : props.value === id);
  const toggle = (id: T) => {
    if (props.multiple) {
      props.onChange(props.value.includes(id) ? props.value.filter((v) => v !== id) : [...props.value, id]);
    } else {
      props.onChange(id);
    }
  };

  return (
    <fieldset>
      <legend className="mb-3 font-semibold">
        {label}
        {props.multiple && props.hint && <span className="font-normal text-ink-2"> {props.hint}</span>}
      </legend>
      <div role={props.multiple ? "group" : "radiogroup"} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = isOn(o.id);
          return (
            <button
              key={o.id}
              type="button"
              role={props.multiple ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => toggle(o.id)}
              className={`min-h-11 rounded-full border px-4 text-[0.98rem] font-medium transition-colors ${
                on ? "border-brand bg-brand text-white" : "border-line-2 bg-white text-ink hover:border-ink-2"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
