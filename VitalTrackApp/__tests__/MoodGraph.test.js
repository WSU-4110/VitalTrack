import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import MoodGraph from '../src/components/MoodGraph';
import { fetchEntries, processMoodData } from '../src/components/analytics/DataProcessor';
import { LineChart } from 'react-native-chart-kit';

jest.mock('../src/components/analytics/DataProcessor');
jest.mock('react-native-chart-kit', () => ({
  LineChart: jest.fn(() => <></>),
}));



describe('MoodGraph Component', () => {

  it('should show error message when theres no mood data', async () => {
    fetchEntries.mockResolvedValue([]);
    processMoodData.mockReturnValue([]);

    render(<MoodGraph />);

    await waitFor(() => {
      expect(screen.getByText('Log entries to see data')).toBeTruthy();
    });
  });

  it('should show the chart when there is mood data', async () => {
    const mockEntries = [
      { mood: 'Good' },
      { mood: 'Okay' },
      { mood: 'Bad' },
    ];
    fetchEntries.mockResolvedValue(mockEntries);
    processMoodData.mockReturnValue([4, 3, 2]);

    render(<MoodGraph />);

    await waitFor(() => {
      expect(LineChart).toHaveBeenCalled();
    });
  });

  it('should pass the correct mood data to the chart', async () => {
    const mockEntries = [
      { mood: 'Good' },
      { mood: 'Okay' },
      { mood: 'Bad' },
    ];
    fetchEntries.mockResolvedValue(mockEntries);
    processMoodData.mockReturnValue([4, 3, 2]);

    render(<MoodGraph />);

    await waitFor(() => {
      expect(LineChart).toHaveBeenCalledWith(
        expect.objectContaining({
           data: {
             datasets: [{ data: [4, 3, 2] }],
             labels: ["Day 1", "Day 2", "Day 3"],
          },
        }),
        {}
      );
    });
  });

  it('should show an empty chart when theres no mood data', async () => {
    fetchEntries.mockResolvedValue([]);
    processMoodData.mockReturnValue([]);

    const { queryByTestId } = render(<MoodGraph />);

    await waitFor(() => {
       expect(LineChart).toHaveBeenCalled();
  });
  });
});
