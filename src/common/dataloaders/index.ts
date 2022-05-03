import { SessionByIdDataloader } from 'src/roulette/dataloaders/session-by-id.dataloader';
import { UserByIdDataloader } from 'src/users/dataloaders/user-by-id.dataloader';

export const dataloaderProviders = [UserByIdDataloader, SessionByIdDataloader];
