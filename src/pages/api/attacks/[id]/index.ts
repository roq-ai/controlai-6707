import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { attackValidationSchema } from 'validationSchema/attacks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.attack
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAttackById();
    case 'PUT':
      return updateAttackById();
    case 'DELETE':
      return deleteAttackById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAttackById() {
    const data = await prisma.attack.findFirst(convertQueryToPrismaUtil(req.query, 'attack'));
    return res.status(200).json(data);
  }

  async function updateAttackById() {
    await attackValidationSchema.validate(req.body);
    const data = await prisma.attack.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAttackById() {
    const data = await prisma.attack.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
