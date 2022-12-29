import { AuthdogResource } from "./resource";
import { ActiveSessionResource, SessionResource } from "./session";

export interface ClientResource extends AuthdogResource {
  sessions: SessionResource[];
  activeSessions: ActiveSessionResource[];
  isNew: () => boolean;
  create: () => Promise<ClientResource>;
  destroy: () => Promise<void>;
  lastActiveSessionId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
