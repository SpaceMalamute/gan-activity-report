import { environment } from '../../../environments/environment';

export abstract class BaseAPIService {
  protected readonly API_ROOT: string = environment.api.url;
  protected abstract readonly API_URL: string;
}
