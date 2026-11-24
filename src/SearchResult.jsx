import { AnimatePresence, motion } from "framer-motion";
import { FiClock, FiSearch } from "react-icons/fi";

/* eslint-disable react/prop-types */
function SearchResult({
  isOpen,
  inputValue,
  filteredCities,
  selectHandler,
  activeIndex,
  setActiveIndex,
  recentlySearched,
}) {
  const highlightMatches = (name, matches) => {
    const ranges = matches
      .filter(([start, end]) => start >= 0 && end >= start)
      .sort(([firstStart], [secondStart]) => firstStart - secondStart);
    const segments = [];
    let cursor = 0;

    ranges.forEach(([start, end]) => {
      const boundedStart = Math.max(start, cursor);
      const boundedEnd = Math.min(end + 1, name.length);
      if (boundedStart >= boundedEnd) return;

      if (cursor < boundedStart)
        segments.push(name.slice(cursor, boundedStart));
      segments.push(
        <strong
          key={`${boundedStart}-${boundedEnd}`}
          className="font-bold text-gray-900"
        >
          {name.slice(boundedStart, boundedEnd)}
        </strong>,
      );
      cursor = boundedEnd;
    });

    if (cursor < name.length) segments.push(name.slice(cursor));
    return segments;
  };

  return (
    <AnimatePresence>
      {isOpen && inputValue.trim() !== "" && (
        <motion.div
          key="suggestions"
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-3 pb-4 pt-5">
            {filteredCities.length > 0 ? (
              <div id="city-suggestions" role="listbox" className="space-y-1">
                {filteredCities.map(({ city, matches }, index) => (
                  <button
                    key={city.id}
                    type="button"
                    id={`city-suggestion-${city.id}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    onClick={() => selectHandler(city)}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group flex w-full items-center gap-5 rounded-xl px-4 py-3 text-left transition-colors ${
                      index === activeIndex
                        ? "bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {recentlySearched.includes(city.id) ? (
                      <FiClock
                        aria-label="Previously searched"
                        className="shrink-0 text-xl text-gray-500"
                      />
                    ) : (
                      <FiSearch className="shrink-0 text-xl text-gray-500" />
                    )}
                    <span className="text-base text-gray-600 group-hover:text-gray-900">
                      {highlightMatches(city.name, matches)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="font-medium text-gray-700">No cities found</p>
                <p className="mt-1 text-sm text-gray-400">
                  Try searching for another city.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchResult;
