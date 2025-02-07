import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const videoId = searchParams.get('videoId');

        if (!videoId) {
            return NextResponse.json({ error: "Missing videoId parameter" }, { status: 400 });
        }

        const pythonProcess = spawn('C:\\Python312\\python.exe', ['fetch_captions.py', videoId]);

        return new Promise<Response>((resolve) => {
            let data = '';
            let errorData = '';

            pythonProcess.stdout.on('data', (chunk) => {
                data += chunk.toString();
            });

            pythonProcess.stderr.on('data', (chunk) => {
                errorData += chunk.toString();
            });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    resolve(NextResponse.json({ 
                        error: `Python script exited with code ${code}. Error: ${errorData}` 
                    }, { status: 500 }));
                    return;
                }

                try {
                    const parsedData = JSON.parse(data.trim());
                    
                    if (parsedData.error) {
                        resolve(NextResponse.json({ error: parsedData.error }, { status: 500 }));
                    } else {
                        resolve(NextResponse.json(parsedData));
                    }
                } catch (error) {
                    resolve(NextResponse.json({ 
                        error: "Invalid JSON response",
                        rawResponse: data 
                    }, { status: 500 }));
                }
            });
        });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}