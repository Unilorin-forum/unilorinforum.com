import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { topicId } = req.body;
    console.log(req.body);
    const trashTopic = await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        trashed: true,
      },
    });
    console.log(trashTopic);
    res.json({
      message: 'successfull',
      success: true,
      body: trashTopic,
    });
  } catch (error) {
    console.log(error);
  }
}
