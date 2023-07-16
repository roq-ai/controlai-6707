import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { benchmarkValidationSchema } from 'validationSchema/benchmarks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.benchmark
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBenchmarkById();
    case 'PUT':
      return updateBenchmarkById();
    case 'DELETE':
      return deleteBenchmarkById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBenchmarkById() {
    const data = await prisma.benchmark.findFirst(convertQueryToPrismaUtil(req.query, 'benchmark'));
    return res.status(200).json(data);
  }

  async function updateBenchmarkById() {
    await benchmarkValidationSchema.validate(req.body);
    const data = await prisma.benchmark.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBenchmarkById() {
    const data = await prisma.benchmark.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
