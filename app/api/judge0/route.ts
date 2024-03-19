import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { code, langCode, input } = reqBody;

  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        source_code: code,
        language_id: langCode,
        stdin: input,
      },
      {
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "fd00590719msh316d49305df1073p147afcjsne8a472dad707",
          "content-type": "application/json",
          accept: "application/json",
        },
      },
    );

    const submissionId = response.data.token;

    // Wait for the result
    let result;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
      result = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
        {
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "fd00590719msh316d49305df1073p147afcjsne8a472dad707",
          },
        },
      );
    } while (result.data.status.id <= 2); // Status ID 2 means 'Processing'

    return NextResponse.json({ result: result.data });
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
}
