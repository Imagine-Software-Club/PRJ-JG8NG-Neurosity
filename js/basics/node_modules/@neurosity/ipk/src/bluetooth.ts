export const BLUETOOTH_PRIMARY_SERVICE_UUID_HEX = 0x1803;
export const BLUETOOTH_PRIMARY_SERVICE_UUID_STRING =
  BLUETOOTH_PRIMARY_SERVICE_UUID_HEX.toString(16);
export const BLUETOOTH_PRIMARY_SERVICE_COMPLETE_UUID_STRING =
  "00001803-0000-1000-8000-00805f9b34fb";

export const BLUETOOTH_DESCRIPTOR_CODE = "2901";
export const BLUETOOTH_DESCRIPTOR_UUID = "00002901-0000-1000-8000-00805f9b34fb";

export const BLUETOOTH_COMPANY_IDENTIFIER_HEX = 0x0bce;
export const BLUETOOTH_COMPANY_IDENTIFIER_STRING =
  BLUETOOTH_COMPANY_IDENTIFIER_HEX.toString(16);
export const BLUETOOTH_DEVICE_NAME_PREFIXES = ["Crown-", "Notion-"];

// Generated via https://www.guidgenerator.com/online-guid-generator.aspx
export const BLUETOOTH_CHARACTERISTICS = {
  deviceId: "d7e84cb2-ff37-4afc-9ed8-5577aeb84542",
  deviceInfo: "97b81f68-04cf-4650-a044-14924f11b9ee",
  actions: "d2e4b9e7-ab9d-4806-88a3-58584c1cf02b",
  status: "1defa07f-2d1c-4e55-b981-eedabba7ae2b",
  settings: "014975ce-50df-4bfb-8ed4-a3437d619268",
  focus: "8e12baf1-81bb-4a1b-8948-9e68a4457d2a",
  calm: "7d47617d-a60a-41d1-8df6-cfb78d02ffeb",
  accelerometer: "84501dee-8665-4073-b111-bdecd69fb489",
  signalQuality: "cf28ed0c-20cd-48ed-93c5-ee2fb265099a",
  signalQualityV2: "902ac5f3-ce59-4c11-94fa-437e89f90630",
  raw: "009cf0bb-b68d-4af1-a0e5-625f2eb964a6",
  rawUnfiltered: "5472432e-3313-4169-add8-6fcb29accb0e",
  psd: "d6684fb0-8518-40c0-8e88-4634e762435d",
  powerByBand: "2f6236dd-215a-427f-b94c-ab5df71937af",
  wifiNearbyNetworks: "f1cd519b-07dc-4f33-a285-286db2393359",
  wifiConnections: "37b2ce69-6fac-4547-91f3-8f1c527b875d",
  auth: "7f9f1a35-9816-471b-bf67-2ec6f2295a1d"
};

export const BLUETOOTH_CHUNK_DELIMITER = "\n";
