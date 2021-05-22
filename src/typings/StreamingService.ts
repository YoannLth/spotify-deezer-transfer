export interface StreamingService {
  token: string;
  userId?: string;

  verifyConnection(): Promise<boolean>;
  fetchUserData(): Promise<any>; // TODO replace any
}
