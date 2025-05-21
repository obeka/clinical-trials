import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TrialsService } from './trial.service';
import { Welcome, Study } from '../models/trial.model';

describe('TrialsService', () => {
  let service: TrialsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrialsService],
    });
    service = TestBed.inject(TrialsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch initial trials', () => {
    const mockResponse: Welcome = {
      studies: [
        {
          protocolSection: { identificationModule: { nctId: '123' } },
        } as Study,
      ],
      nextPageToken: 'next-token',
    };

    service.fetchInitialTrials().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.trials()).toEqual(mockResponse.studies);
      expect(service.getNextPageToken()).toBe('next-token');
    });

    const req = httpMock.expectOne(
      'https://clinicaltrials.gov/api/v2/studies?pageSize=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the next trial', () => {
    const mockResponse: Welcome = {
      studies: [
        {
          protocolSection: { identificationModule: { nctId: '456' } },
        } as Study,
      ],
      nextPageToken: 'next-next-token',
    };

    service.setNextPageToken('next-token');

    service.fetchNextTrial().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(service.trials()[0]).toEqual(mockResponse.studies[0]);
      expect(service.getNextPageToken()).toBe('next-next-token');
    });

    const req = httpMock.expectOne(
      'https://clinicaltrials.gov/api/v2/studies?pageSize=1&pageToken=next-token'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
