import { AuthdogResource } from "./resource";

export interface IUserProfilePicture {
  id: string;
  type: string;
  value: string;
}

export interface UserResource extends AuthdogResource {
  id: string;
  displayName: string;
  externalId: string;
  locale: string | null;
  nickName: string | null;
  photos: IUserProfilePicture[];
  preferredLanguage: string | null;
  profileUrl: string | null;
  title: string | null;
  userType: string | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}
