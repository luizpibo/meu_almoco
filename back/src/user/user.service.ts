import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PasswordProvider } from 'src/providers/password';
import { Users, Prisma, Accounts } from '@prisma/client';

interface createUserRequestDTO {
  username: string;
  password: string;
}

interface createUserResponseDTO {
  username: string;
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordProvider: PasswordProvider,
  ) {}

  async user(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
    delete user.password;
    return user;
  }

  async create(data: createUserRequestDTO): Promise<createUserResponseDTO> {
    const userWithUsernameExists = await this.prisma.users.findUnique({
      where: { username: data.username },
    });

    if (userWithUsernameExists) {
      throw new HttpException(
        'There is already an account registered with this username',
        HttpStatus.CONFLICT,
      );
    }

    const passwordHashed = await this.passwordProvider.hashPassword(
      data.password,
    );
    const user = await this.prisma.users.create({
      data: {
        username: data.username,
        password: passwordHashed,
        account: {
          create: {
            balance: 100,
          },
        },
      },
    });

    delete user.password;

    return user;
  }

  async findByUsername(username: string): Promise<Users | undefined> {
    const prismaReturn = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
    return prismaReturn
  }

  async findAll(): Promise<Users[] | undefined> {
    return await this.prisma.users.findMany();
  }

  async makeTransaction(transaction: {
    userUid: string;
    creditedAccountId: string;
    value: number;
  }): Promise<boolean> {
    return true;
  }

  async findAllUserAccount(userName: string): Promise<any | undefined> {
    const user = await this.prisma.users.findFirst({
      where: {
        username: userName,
      },
    });
    console.log("username", userName);
    console.log("user", user)
    if (user) {
      const account = await this.prisma.accounts.findFirst({
        where: {
          id: user.accountId
        }
      });

      return {
        accountId: account.id,
        balance: Number(account.balance),
      };
    }
  }
}
