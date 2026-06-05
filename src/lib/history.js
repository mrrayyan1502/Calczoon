export const getHistory = () => {
  try {
    const history = localStorage.getItem('calcHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Could not retrieve history from localStorage", error);
    return [];
  }
};

export const saveCalculation = (calculation) => {
  try {
    const history = getHistory();
    const newHistory = [{ ...calculation, id: new Date().toISOString(), date: new Date().toISOString() }, ...history];
    
    // Optional: Limit history size
    // if (newHistory.length > 50) {
    //   newHistory.length = 50;
    // }

    localStorage.setItem('calcHistory', JSON.stringify(newHistory));
  } catch (error) {
    console.error("Could not save calculation to localStorage", error);
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem('calcHistory');
  } catch (error) {
    console.error("Could not clear history from localStorage", error);
  }
};