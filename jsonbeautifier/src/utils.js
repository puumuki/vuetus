/**
 * Format or beautify given JSON data
 * 
 * @param {string} json 
 * @param {string|Number} space, how many spaces are used to ident formatted JSON.
 * @return {string} beautified JSON
 */
function formatJSON(json, space=2) {
  try {
    const jsonData = JSON.parse(json);
    return JSON.stringify(jsonData, null, space);
  } catch (error) {
    return "";
  }
}

const DEFAULT_DATA = {
  rawjson: "",
  settings: {
    spaces: 2
  }
}

/**
 * Get application data stored to local storage.x
 * If data is corrupted or not available default values are returned.
 *
 * @return {object} application data
 */
function getStoredData() {
  let data = window.localStorage.getItem("data");

  if (data) {
    try {
      data = JSON.parse( data );
    } catch (error) {
      console.error("Could not parse stored data, falling back to default data", error);
      data = DEFAULT_DATA;
    }
  } else {
    //Default data
    data = DEFAULT_DATA;
  }

  return data;
}

function setStoredData(name, value) {
  const data = getStoredData();
  data[name] = value;
  window.localStorage.setItem("data", JSON.stringify(data));
}

export { formatJSON, getStoredData, setStoredData };