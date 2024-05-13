// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const bucketName = 'irisyu_blog';

const prefix = 'article/';

function removeFileString(str: string) {
  return str.replace(/.*\//, '');
}

// TODO: cache
export async function GET(request: Request) {
  const options = {
    prefix,
  };

  try {
    // throw new Error('errrrrr')
    const [files] = await storage.bucket(bucketName).getFiles(options);
    // console.log('Files:', files);
    const data: Array<{ name: string, udpated: string; }> = [];
    files.forEach((file: { metadata: { name: string, updated: string; }; }) => {
      const { metadata } = file;
      const { name, updated } = metadata;
      data.push({ name: removeFileString(name), udpated: metadata.updated });
    });

    return Response.json({ data: data });
  } catch (e) {
    console.log(`Error when getting bucket data:`, e);
  }

  return Response.json(null);
}