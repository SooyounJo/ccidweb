import { google } from "googleapis";

export async function GET(request) {
  try {
    // 환경 변수 가져오기
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // 로컬이나 환경변수가 설정되지 않은 경우 방어적으로 처리
    if (!serviceAccountEmail || !rawPrivateKey || !spreadsheetId) {
      console.error("Google Sheets env vars are missing.");
      return new Response(
        JSON.stringify({
          message: "Google Sheets environment variables are not set",
          success: false,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
          },
        }
      );
    }

    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

    // Google API 인증 설정
    const auth = await google.auth.getClient({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    // Google Sheets API 클라이언트 생성
    const sheets = google.sheets({ version: "v4", auth });

    // 여러 시트에서 데이터 가져오기
    const ranges = ["main!A1:A2", "about!A1:D12", "works!A1:T6", "members!A1:E100", "desc!A1:E10"];
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });

    // 데이터 정리
    const data = {
      main: response.data.valueRanges[0].values,
      about: response.data.valueRanges[1].values,
      works: response.data.valueRanges[2].values,
      members: response.data.valueRanges[3].values,
      desc: response.data.valueRanges[4].values,
    };

    // JSON 응답 반환
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching spreadsheet data:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch spreadsheet data",
        success: false,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
        },
      }
    );
  }
}

// CORS preflight 대응
export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": request.headers.get("origin") || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
