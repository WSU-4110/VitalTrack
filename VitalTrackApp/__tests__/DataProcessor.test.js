import { fetchEntries, processMoodData, processActivities } from '../src/components/analytics/DataProcessor';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

jest.mock('axios');
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: { uid: 'xbsiAyJfc2Zt45Hgy4dEPaCsjZJ2' },
  })),
}));

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
}));

describe('fetchEntries', () => {
  it('should return entries when user is found and fetching responses works', async () => {
    auth.mockReturnValueOnce({
        currentUser: { uid: 'xbsiAyJfc2Zt45Hgy4dEPaCsjZJ2' },
    });
    axios.get.mockResolvedValueOnce({
      data: { success: true, entries: [{ mood: 'Good', activityType: 'Weights' }] },
    });

    const result = await fetchEntries();

    expect(result).toEqual([{ mood: 'Good', activityType: 'Weights' }]);
  });

  it('should return an empty array if user doesnt exist', async () => {
    auth.mockReturnValueOnce({
      currentUser: null,
    });
    const result = await fetchEntries();
    expect(result).toEqual([]);
  });

  it('should return an empty array if there is an error during fetch', async () => {
    auth.mockReturnValueOnce({
          currentUser: { uid: 'xbsiAyJfc2Zt45Hgy4dEPaCsjZJ2' },
  });

    axios.get.mockRejectedValueOnce(new Error('Fetch error'));
    const result = await fetchEntries();
    expect(result).toEqual([]);
  });

  it('should return an empty array if there is network error', async () => {
    auth.mockReturnValueOnce({
      currentUser: { uid: 'xbsiAyJfc2Zt45Hgy4dEPaCsjZJ2' },
    });

    axios.get.mockRejectedValueOnce(new Error('Network error'));
    const result = await fetchEntries();
    expect(result).toEqual([]);
  });
});

describe('processMoodData', () => {
  it('should return the correct mood from past 7 entries', () => {

    const entries = [
      { mood: 'Good' },
      { mood: 'Bad' },
      { mood: 'Great' },
      { mood: 'Okay' },
      { mood: 'Very Bad' },
      { mood: 'Good' },
      { mood: 'Okay' },
      { mood: 'Bad' },
    ];

    const result = processMoodData(entries);

    expect(result).toEqual([4, 2, 5, 3, 1, 4, 3]);
  });

  it('should return an array with 0 for empty moods', () => {
    const entries = [{ mood: 'Unknown' }];

    const result = processMoodData(entries);

    expect(result).toEqual([0]);
  });
});

describe('processActivities', () => {
  it('should return the correct activities from past 7 entries', () => {
    const entries = [
      { activityType: 'Yoga' },
      { activityType: 'Walk' },
      { activityType: 'Yoga' },
      { activityType: 'Walk' },
      { activityType: 'Weights' },
      { activityType: 'Weights' },
      { activityType: 'Walk' },
      { activityType: 'Walk' },
    ];

    const result = processActivities(entries);

    expect(result).toEqual({
      Yoga: 2,
      Walk: 3,
      Weights: 2,
    });
  });

  it('should return nothing if there are no activity entries', () => {
    const entries = [{ mood: 'Good' }, { mood: 'Okay' }];

    const result = processActivities(entries);

    expect(result).toEqual({});
  });
 });
