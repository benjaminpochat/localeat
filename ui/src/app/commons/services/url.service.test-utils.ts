import { environment } from 'src/environments/environment';
import { UrlService } from './url.service';

export class UrlServiceTestUtils {

  static mockUrlService(urlService: UrlService) {
    jest.spyOn(urlService, 'getAuthenticatedUrl').mockImplementation(
      ([...uriElements]) => 'http://localhost:8080/accounts/1/' + uriElements.join('/')
    );
  }
}
