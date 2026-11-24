import { FiSearch, FiClock } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

/* eslint-disable react/prop-types */
function RecentlySearched({ cities, onSelect, setRecentlySearched }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = () => {
    setRecentlySearched([]);
    setIsModalOpen(false);
  };

  if (cities.length === 0 && !isModalOpen) return null;

  return (
    <div className="space-y-2 px-3 pb-4 pt-5">
      <div className="flex items-center justify-between px-4 pb-2">
        <h3 className="flex gap-x-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Recently Searched
          <FiClock className="mt-0.5 text-sm text-gray-400" />
        </h3>
        <FaRegTrashAlt
          onClick={() => setIsModalOpen(true)}
          className="mt-0.5 cursor-pointer text-sm text-gray-400 hover:text-red-400"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-4">
        {cities.map((city) => (
          <button
            key={city.id}
            type="button"
            onClick={() => onSelect(city)}
            className="group flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left transition-colors hover:bg-gray-100"
          >
            <FiSearch className="shrink-0 text-sm text-gray-400 group-hover:text-gray-700" />
            <span className="flex-1 text-sm text-gray-600 group-hover:text-gray-900">
              {city.name}
            </span>
          </button>
        ))}
      </div>
      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        deleteHandler={deleteHandler}
      />
    </div>
  );
}
export default RecentlySearched;
