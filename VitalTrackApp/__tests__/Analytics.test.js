import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import AnalyticsScreen from '../src/screens/Analytics';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import MoodGraph from '../src/components/MoodGraph';

jest.mock('axios');
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    currentUser: { uid: 'mock-user-id' },
  })),
}));
jest.mock('../src/components/MoodGraph', () => jest.fn(() => <></>));

describe('AnalyticsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display correct trend analysis', async () => {
    const mockTipsResponse = { data: { message: ['Stay hydrated', 'Exercise regularly'] } };
    const mockTrendsResponse = {
      trends: {
        activity_mood_insight: 'You tend to feel better after exercising.',
        moving_averages: { well_being: [3], mood: [2] },
        weekly_summary: { date: ['2023-01-01'], well_being: [3], mood: [4] },
      },
    };

    axios.get.mockResolvedValueOnce(mockTipsResponse);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTrendsResponse),
      })
    );

    render(<AnalyticsScreen />);

    await waitFor(() => {
      expect(screen.getByText('AI Insights')).toBeTruthy();
      expect(screen.getByText('• Stay hydrated')).toBeTruthy();
      expect(screen.getByText('• Exercise regularly')).toBeTruthy();

      expect(screen.getByText('Activity Insights')).toBeTruthy();
      expect(screen.getByText('You tend to feel better after exercising.')).toBeTruthy();
      expect(screen.getByText('Weekly averages of well-being and mood:')).toBeTruthy();
      expect(screen.getByText('Well-being: Good')).toBeTruthy();
      expect(screen.getByText('Mood: Moderate')).toBeTruthy();
      expect(screen.getByText('Week ending 2023-01-01:')).toBeTruthy();
    });
  });

  it('should show error message when theres no data', async () => {
    const mockTipsResponse = { data: { message: [] } };
    const mockTrendsResponse = {
      trends: {
        activity_mood_insight: null,
        moving_averages: { well_being: [], mood: [] },
        weekly_summary: { date: [], well_being: [], mood: [] },
      },
    };

    axios.get.mockResolvedValueOnce(mockTipsResponse);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTrendsResponse),
      })
    );

    render(<AnalyticsScreen />);

    await waitFor(() => {
      expect(screen.getByText('No AI insights available')).toBeTruthy();
      expect(screen.getByText('No weekly summary available')).toBeTruthy();
    });
  });

  it('show show error message when theres network errors', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network Error'));
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<AnalyticsScreen />);

    await waitFor(() => {
      expect(screen.getByText('No AI insights available')).toBeTruthy();
      expect(screen.getByText('No weekly summary available')).toBeTruthy();
    });
  });
});
