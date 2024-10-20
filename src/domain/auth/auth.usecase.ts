import { getAdminByEmailRepo } from '@/data-access/admin.repo';
import { loginRequestType } from '@/types/auth.type';
import { signToken } from '@/utils/auth.util';
import { comparePassword } from '@/utils/bycrypt.util';
import { createErrorResponse } from '@/utils/response';
import { FastifyReply } from 'fastify';

export const loginUseCase = async (
  body: loginRequestType,
  res: FastifyReply,
) => {
  const admin = await getAdminByEmailRepo(body?.email);
  if (!admin) return createErrorResponse(res, 'Invalid credentials', 401);

  const isPasswordValid = await comparePassword(body?.password, admin.password);
  if (!isPasswordValid) {
    return createErrorResponse(res, 'Invalid credentials', 401);
  }

  const token = signToken(admin.adminId!);
  return token;
};
