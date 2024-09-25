import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      email: string;
      salt: string;
      image: string;
      isCreatedByInvitation: boolean;
      subscription: {
        name: string;
        storageMB: number;
        seats: number;
        occupiedStorageMB: number;
        occupiedSeats: number;
        isActive: boolean;
        periodStartsAt: number;
        periodEndsAt: number;
        stripeSubscriptionId: string;
        stripeProductId: string;
        hasBeenFreeTrial: boolean;
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    token: string;
    iat: number;
    exp: number;
    jti: string;
  }
  expires: string;
}
