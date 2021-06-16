import { environment } from 'src/environments/environment';
import { UrlService } from './url.service';

export class UrlServiceTestUtils {

  static mockUrlService(urlService: UrlService) {
    jest.spyOn(urlService, 'getAuthenticatedUrl').mockImplementation(
      ([...uriElements]) => environment.localeatCoreUrl + '/accounts/1/' + uriElements.join('/')
    );
  }
}
