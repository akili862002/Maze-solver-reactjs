interface IGroupRadioProps<T> {
  className?: string;
  optionSelected: T;
  options: T[];
  onSelect: (option: T) => T;
  renderOption: React.FC<T>;
  isEqual: (a: T, b: T) => boolean;
}

const GroupRadio = <T,>(props: IGroupRadioProps<T>) => {
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
      {options.map((option, index) => (
        <label key={index}>
          <input
            onChange={() => onSelect(option)}
            checked={isEqual(option, optionSelected)}
            type="radio"
            className="w-2.5 h-2.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          {renderOption(option)}
        </label>
      ))}
    </div>
  );
};

export default GroupRadio;
