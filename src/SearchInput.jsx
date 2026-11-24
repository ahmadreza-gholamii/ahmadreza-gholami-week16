import { FiSearch, FiX } from "react-icons/fi";

/* eslint-disable react/prop-types */
const Input = ({
  value,
  handleChange,
  handleClear,
  handleFocus,
  handleKeyDown,
  inputRef,
  isOpen,
}) => {
  
  return (
    <div className="flex items-center gap-4 rounded-full bg-white px-6 py-5 shadow-[0_12px_25px_rgba(0,0,0,0.08)]">
      <FiSearch className="shrink-0 text-3xl text-gray-500" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        aria-label="Search for a city"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="city-suggestions"
        placeholder="Search for a city..."
        className="min-w-0 flex-1 bg-transparent text-lg text-gray-800 outline-none placeholder:text-gray-400"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          <FiX className="text-2xl" />
        </button>
      )}
    </div>
  );
};
export default Input;
