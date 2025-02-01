import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
// const pdfUrl='https://tremendous-snail-976.convex.cloud/api/storage/3538e904-1bbd-4205-9e09-2d00947bf02d'
export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log(pdfUrl);

  //     //load pdf

  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent;
  });
  // //split the text in small chunks

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const output = await splitter.createDocuments([pdfTextContent]);
  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splitterList });
}
