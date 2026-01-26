import { set } from "lodash";
import cloneDeep from "lodash/cloneDeep";

/**
 * Applies a suggested change to the resume JSON structure
 * @param {Object} currentData - The full resume JSON object
 * @param {string} path - The json_path from the suggestion (e.g., "experience[0].description")
 * @param {string} newValue - The newText provided by Gemini
 * @returns {Object} - A new copy of the updated resume JSON
 */
export const applySuggestion = (currentData, path, newValue) => {
  // We clone the data to keep the operation "pure" (React best practice)
  const updatedData = cloneDeep(currentData);

  // lodash/set handles paths like "work[0].highlights[1]" automatically
  set(updatedData, path, newValue);

  return updatedData;
};
