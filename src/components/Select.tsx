interface ISelectProps<T> {
  className?: string;
  optionSelected: T;
  placeholder: string;
  options: T[];
  onSelect: (option: T) => void;
  renderOption: (option: T) => string;
  isEqual: (a: T, b: T) => boolean;
}

const Select = <T,>(props: ISelectProps<T>) => {
  const {
    className = "",
    optionSelected,
    options,
    onSelect,
    renderOption,
    isEqual,
  } = props;

  return (
    <div className={className}>
      <select
        onChange={(e) => {
          const index = Number(e.target.value);
          onSelect(options[index]);
        }}
        id="countries"
        className="block w-full p-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-4 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option
            value={index}
            key={index}
            selected={isEqual(option, optionSelected)}
          >
            {renderOption(option)}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
