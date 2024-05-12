import axios from 'axios';

const BASE_URL = "http://192.168.4.1";

// Load the API url from a static file. This file will be updated
// by the AudioLux firmware on boot or when a local WiFi network
// is joined.
// const base_url = "http://audioluxone.local";
const base_url = BASE_URL;

const getSettings = () => getData("settings");

const getPatternList = () => getData("patterns");

const getWiFiList = () => getData("wifis");

const getWiFi = () => getData("wifi");

const getWiFiJoinStatus = () => getData("wifi_status");

const getHostname = () => getData("hostname");

const getHistory = () => getData("history");

const getData = (path) =>
  axios
    .get(`${base_url}/api/${path}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((response) => response.data);

const saveSettings = (settings) =>
  axios.put(`${base_url}/api/settings`, { ...settings });

const joinWiFi = (wifi) => axios.put(`${base_url}/api/wifi`, { ...wifi });

const saveHostname = (hostname) =>
  axios.put(`${base_url}/api/hostname`, { hostname });

// ESSENTIAL API CALLS

// handle_subpattern_update_put_request
const updateLoadedSubpattern = (subpattern, data) =>
  axios.put(
    `${base_url}/api/updateLoadedSubpattern?subpattern=${subpattern}`,
    data
  );

// handle_pattern_update_put_request
const updateLoadedPattern = (data) =>
  axios.put(`${base_url}/api/updateLoadedPattern`, data);

// handle_loaded_subpattern_get_request
const getLoadedSubpattern = (subpattern) =>
  axios
    .get(`${base_url}/api/loadedSubpatterns?sp=${subpattern}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((response) => response.data);

// handle_loaded_pattern_settings_get_request
const getLoadedPatternSettings = () =>
  axios
    .get(`${base_url}/api/loadedPatternSettings`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((response) => response.data);

const loadSaveSlot = async (slot) => {
  await axios.put(`${base_url}/api/loadSaveSlot`, {
    slot: slot,
    timeout: 1000,
  });
};

const updateDeviceSettings = (data) => {
  axios.put(`${base_url}/api/updateDeviceSettings`, data);
};

const saveToSlot = (slot) =>
  axios.put(`${base_url}/api/saveToSlot`, { slot: slot });

const getSystemSettings = () =>
  axios
    .get(`${base_url}/api/getDeviceSettings`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((response) => response.data);

export {
  getSettings,
  saveSettings,
  getPatternList,
  getWiFiList,
  getWiFi,
  joinWiFi,
  getWiFiJoinStatus,
  getHostname,
  saveHostname,
  getHistory,
  getLoadedSubpattern,
  getLoadedPatternSettings,
  updateLoadedSubpattern,
  updateLoadedPattern,
  loadSaveSlot,
  saveToSlot,
  updateDeviceSettings,
  getSystemSettings,
  base_url,
};
