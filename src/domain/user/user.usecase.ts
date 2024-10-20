import AdminModel from '@/data-access/models/admin.schema';
import ReferredUserModel from '@/data-access/models/referreduser.schema';
import UserModel from '@/data-access/models/user.schema';
import { CreateUserType, UpdateUserProfileType } from '@/types';
import { loginRequestType } from '@/types/auth.type';
import { signToken } from '@/utils/auth.util';
import { comparePassword, hashPassword } from '@/utils/bycrypt.util';

export const creatUserUseCase = async (body: CreateUserType) => {
  const { email, password, referralCode } = body;
  const existingUser = await UserModel.findOne({ email });
  // TODO throw new custom erros
  if (existingUser) throw new Error('Email already in use');
  const hashedPassword = await hashPassword(password);
  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
  });
  if (referralCode) {
    const referreedAdmin = await AdminModel.findOne({
      referralCode: referralCode,
    });
    if (!referralCode) {
      throw new Error('Invalid referral code!');
    }
    await ReferredUserModel.create({
      userId: newUser.userId,
      referralCode,
      referredBy: referreedAdmin?.adminId,
    });
    const token = signToken(newUser.userId);
    return token;
  }
};

export const loginUserUseCase = async (body: loginRequestType) => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  const token = signToken(user.userId);

  return token;
};

export const updateUserProfileUseCase = async (
  userId: string,
  updateData: UpdateUserProfileType,
) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      omitUndefined: true,
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
