import { Office } from '../../../../@types/Office';
import { User } from '../../../../@types/User';

export function isUser(doc: User | Office): doc is User {
  return (doc as User).username !== undefined;
}
