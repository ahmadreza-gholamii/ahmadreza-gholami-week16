import { AnimatePresence, motion } from "framer-motion";
import {
  FaCity,
  FaGlobeAmericas,
  FaInfoCircle,
  FaUsers,
  FaExpandArrowsAlt,
} from "react-icons/fa";

/* eslint-disable react/prop-types */
function CityDetails({ selectedCity }) {
  return (
    <AnimatePresence mode="wait">
      {selectedCity && (
        <motion.div
          key={selectedCity.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 overflow-hidden rounded-3xl bg-white shadow-lg"
        >
          <img
            src={selectedCity.image}
            alt={selectedCity.name}
            className="h-64 w-full object-cover"
          />
          <div className="space-y-4 p-6">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <FaCity className="text-gray-400" />
                {selectedCity.name}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <FaGlobeAmericas className="text-gray-400" />
                {selectedCity.country}
              </p>
            </div>
            <p className="flex items-start gap-2 text-sm leading-7 text-gray-600">
              <FaInfoCircle className="mt-2 shrink-0 text-blue-500" />
              {selectedCity.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gray-100 p-4">
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <FaUsers />
                  Population
                </p>
                <p className="mt-2 text-xl font-bold text-gray-800">
                  {selectedCity.population.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-100 p-4">
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <FaExpandArrowsAlt />
                  Area
                </p>
                <p className="mt-2 text-xl font-bold text-gray-800">
                  {selectedCity.area} km²
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default CityDetails;
