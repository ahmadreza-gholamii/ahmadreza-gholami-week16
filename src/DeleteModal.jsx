import { AnimatePresence, motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";

/* eslint-disable react/prop-types */
function DeleteModal({ isModalOpen, setIsModalOpen, deleteHandler }) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={() => setIsModalOpen(false)}
          className="fixed backdrop-blur-sm inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
          >
            <div className="text-center">
              <FaRegTrashAlt className="mx-auto mb-3 text-3xl text-red-400" />
              <h3 className="text-lg font-bold text-gray-800">
                Delete Recent Searches?
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete all recently searched cities?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteHandler}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default DeleteModal;
