import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LogService } from '../services/LogService';

@Controller('feed')
export class WikimediaController {

  private cachedContent: any;

  //Injection of Dependency
  constructor(
    private readonly httpService: HttpService,
    private readonly logService: LogService,
  ) {}

  @Get(':language/:year/:month/:day')
  async getContent(@Param('language') language: string,@Param('year') year: string,
    @Param('month') month: string,@Param('day') day: string,): Promise<any> {
    if (!language || !year || !month || !day) {
          throw new Error('Fields required.');
    }
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}`;
    try {
      const response = await this.httpService.get(url).toPromise();
      this.cachedContent = response.data;
      
      // Insert this information into the database for logging purposes
      await this.logService.insertLog(url, JSON.stringify(this.cachedContent));

      return this.cachedContent;
    } catch (error) {
      throw new Error(`Error fetching Wikimedia content: ${error.message}`);
    }
  }

  //Method don't used because it need a subscription for get an API KEY
  @Get('translate/:language')
  async getTranslation(@Param('language') language: string): Promise<any> {
    if (!this.cachedContent) {
      throw new Error('Content not available. Please fetch content first.');
    }

    const translateUrl = 'https://libretranslate.com/translate';
    const requestData = {
      q: this.cachedContent,
      source: 'auto',
      target: language || 'en',
      format: 'text',
    };

    try {
      const response = await this.httpService.post(translateUrl, requestData).toPromise();
      return response.data;
    } catch (error) {
      console.error('Translation API Error:', error.response.data);
      throw new Error('Error fetching translation. Please check the request parameters.');
    }
  }
}
