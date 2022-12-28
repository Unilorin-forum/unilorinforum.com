import { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import slugify from 'slugify';

const s3 = new S3({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let { name, type, level } = req.body;
    console.log(name);
    const year = dayjs().format('YYYY');
    const id = v4().substring(0, 6);
    const materialUrl = slugify(`${year}/${id}-${name}`, {
      replacement: '-',
      strict: true,
      lower: true,
    });
    const fileParams = {
      Bucket: process.env.BUKETNAME,
      Key: `materials/${materialUrl}`,
      Expires: 600,
      ContentType: type,
    };
    const url = await s3.getSignedUrlPromise('putObject', fileParams);
    res.status(200).json({ success: true, url: url, materialUrl: materialUrl });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set desired value here
    },
  },
};
