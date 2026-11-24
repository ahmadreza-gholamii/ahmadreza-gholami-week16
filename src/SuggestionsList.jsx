import { useEffect, useMemo, useRef, useState } from "react";
import cities from "./cities.json";
import Input from "./SearchInput";
import SearchResult from "./SearchResult";
import CityDetails from "./CityDetails";
import RecentlySearched from "./RecentlySearched";
import Fuse from "fuse.js";

function SuggestionsList() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [recentlySearched, setRecentlySearched] = useState(() => {
    return JSON.parse(localStorage.getItem("recentlySearched")) || [];
  });

  const fuse = useMemo(
    () =>
      new Fuse(cities, {
        keys: ["name"],
        threshold: 0.3,
        isCaseSensitive: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
        includeMatches: true,
      }),
    [],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (recentlySearched.length === 0) {
      localStorage.removeItem("recentlySearched");
      return;
    }
    localStorage.setItem("recentlySearched", JSON.stringify(recentlySearched));
  }, [recentlySearched]);

  const query = inputValue.trim();
  const exactResults =
    query === ""
      ? []
      : cities
          .filter((city) => city.name.startsWith(query))
          .map((city) => ({
            city,
            matches: [[0, query.length - 1]],
          }));

  const fuzzyResults =
    exactResults.length === 0 && query.length >= 2
      ? fuse.search(query).map((result) => ({
          city: result.item,
          matches: result.matches?.[0]?.indices || [],
        }))
      : [];

  const filteredCities = (
    exactResults.length > 0 ? exactResults : fuzzyResults
  ).slice(0, 8);

  const selectHandler = (city) => {
    setInputValue(city.name);
    setSelectedCity(city);
    setIsOpen(false);
    setActiveIndex(-1);
    setRecentlySearched((prev) =>
      [city.id, ...prev.filter((id) => id !== city.id)].slice(0, 8),
    );
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setSelectedCity(null);
    setActiveIndex(-1);
    setIsOpen(true);
  };
  const clearHandler = () => {
    setInputValue("");
    setSelectedCity(null);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const keyDownHandler = (event) => {
    if (filteredCities.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current < filteredCities.length - 1 ? current + 1 : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        current <= 0 ? filteredCities.length - 1 : current - 1,
      );
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      selectHandler(filteredCities[activeIndex].city);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const recentCities = recentlySearched
    .slice(0, 4)
    .map((id) => cities.find((city) => city.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#E9EEEE] px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div
          ref={searchRef}
          className="relative rounded-[2.5rem] bg-white p-3 shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
        >
          <div className="relative z-10">
            <Input
              value={inputValue}
              handleChange={changeHandler}
              handleClear={clearHandler}
              handleFocus={() => setIsOpen(true)}
              handleKeyDown={keyDownHandler}
              inputRef={inputRef}
              isOpen={isOpen}
            />
          </div>
          <SearchResult
            isOpen={isOpen}
            inputValue={inputValue}
            filteredCities={filteredCities}
            selectHandler={selectHandler}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            recentlySearched={recentlySearched}
          />
        </div>
        <RecentlySearched
          cities={recentCities}
          onSelect={selectHandler}
          setRecentlySearched={setRecentlySearched}
        />
        <CityDetails selectedCity={selectedCity} />
      </div>
    </div>
  );
}
export default SuggestionsList;
