// import { NextResponse } from 'next/server';
// import pdfParse from 'pdf-parse';

// export async function POST(request) {
//   try {
//     // Extract the uploaded file from the request
//     const formData = await request.formData();
//     const file = formData.get('file'); // Ensure the key matches the formData key in the frontend

//     if (!file) {
//       return NextResponse.json(
//         { error: 'No PDF file provided' },
//         { status: 400 }
//       );
//     }

//     // Convert the file to a buffer
//     const fileBuffer = Buffer.from(await file.arrayBuffer());

//     // Parse the PDF using pdf-parse
//     const pdfData = await pdfParse(fileBuffer);

//     // Return the extracted text
//     return NextResponse.json({ text: pdfData.text });
//   } catch (error) {
//     console.error('Error extracting text from PDF:', error);
//     return NextResponse.json(
//       { error: 'Failed to process PDF' },
//       { status: 500 }
//     );
//   }
// }


// app/api/extractPdfats/route.js
import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export async function POST(request) {
  try {
    // Extract the uploaded file from the request
    const formData = await request.formData();
    const file = formData.get('pdf');

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Parse the PDF using pdf-parse
    const pdfData = await pdfParse(fileBuffer);

    // Return the extracted text
    return NextResponse.json({ text: pdfData.text });
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}