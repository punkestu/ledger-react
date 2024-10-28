import { gapi } from "gapi-script";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export async function ListWallet() {
  try {
    const response = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
      includeGridData: false,
    });
    return response.result.sheets;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
}

export async function MutateWallet({ wallet, kredit, debit, keterangan }) {
  const id = uuidv4();
  const timestamp = moment().format("YYYY/MM/DD HH:mm:ss");
  const lastTotal = await GetLastTotal(wallet.title);
  const total =
    (parseInt(lastTotal[5] || 0) || 0) +
    (parseInt(kredit) || 0) -
    (parseInt(debit) || 0);
  console.log(total);
  const response = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
    range: wallet.title,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[id, timestamp, kredit || 0, debit || 0, keterangan, total]],
    },
  });
  return response;
}

export async function TransferBalance({ from, to, nominal, admin }) {
  const fromLastTotal = await GetLastTotal(from.title);
  const fromTotal =
    (parseInt(fromLastTotal[5]) || 0) -
    parseInt(nominal) -
    (parseInt(admin) || 0);
  const fromResponse = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
    range: from.title,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          uuidv4(),
          moment().format("YYYY/MM/DD HH:mm:ss"),
          0,
          nominal,
          `transfer to ${to.title}`,
          fromTotal,
        ],
      ],
    },
  });

  const toLastTotal = await GetLastTotal(to.title);
  const toTotal =
    (parseInt(toLastTotal[5]) || 0) + parseInt(nominal);
  const toResponse = await gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
    range: to.title,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          uuidv4(),
          moment().format("YYYY/MM/DD HH:mm:ss"),
          nominal,
          0,
          `receive from ${from.title}`,
          toTotal,
        ],
      ],
    },
  });

  return [fromResponse, toResponse];
}

export async function GetLastTotal(title) {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
    range: title,
  });
  const values = response.result.values;
  if (!values) return 0;
  return values[values.length - 1];
}

export async function CreateSheet(title) {
  const response = await gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
    requests: [
      {
        addSheet: {
          properties: {
            title,
            sheetType: "GRID",
          },
        },
      },
    ],
  });
  const headers = ["ID", "timestamp", "kredit", "debit", "note", "total"];
  const range = `${title}!A1:${String.fromCharCode(65 + headers.length - 1)}1`;

  await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
    range: range,
    valueInputOption: "RAW",
    resource: {
      values: [headers],
    },
  });
  return response;
}
