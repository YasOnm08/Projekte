// getLocalStorageData.ts

// Function to retrieve all items from localStorage
export const getAllLocalStorageItems = (): Record<string, string | null> => {
  const allData: Record<string, string | null> = {}; // Object to hold key-value pairs from localStorage

  // Check if localStorage is available
  if (typeof localStorage !== 'undefined') {
      // Iterate through all localStorage keys
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i); // Get the key at the current index
          if (key) {
              const value = localStorage.getItem(key); // Retrieve the value associated with the key
              allData[key] = value; // Store the key-value pair in the allData object
          }
      }
  }
  return allData; // Return the object containing all localStorage items
};
