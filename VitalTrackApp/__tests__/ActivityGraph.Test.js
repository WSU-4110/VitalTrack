import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import ActivityGraph from '../src/components/analytics/ActivityGraph';
import { fetchEntries, processActivities } from '../src/components/analytics/DataProcessor';
import { BarChart } from 'react-native-chart-kit';

jest.mock('../src/components/analytics/DataProcessor');
jest.mock('react-native-chart-kit', () => ({
  BarChart: jest.fn(() => <></>),
}));

describe('ActivityGraph Component', () => {

  it('should show error message when there is no activity data', async () => {
    fetchEntries.mockResolvedValue([]);
    processActivities.mockReturnValue({});

    render(<ActivityGraph />);

    await waitFor(() => {
      expect(screen.getByText('Log entries to see data')).toBeTruthy();
    });
  });

  it('should show the chart when there is activity data', async () => {
    const mockEntries = [
      { activity: 'Yoga' },
      { activity: 'Walk' },
      { activity: 'Weights' },
    ];
    fetchEntries.mockResolvedValue(mockEntries);
    processActivities.mockReturnValue({ Yoga: 5, Walk: 3, Weights: 2 });

    render(<ActivityGraph />);

    await waitFor(() => {
      expect(BarChart).toHaveBeenCalled();
    });
  });

  it('should pass the correct activity data to the chart', async () => {
    const mockEntries = [
      { activity: 'Yoga' },
      { activity: 'Walk' },
      { activity: 'Weights' },
    ];
    fetchEntries.mockResolvedValue(mockEntries);
    processActivities.mockReturnValue({ Yoga: 5, Walk: 3, Weights: 2 });

    render(<ActivityGraph />);

    await waitFor(() => {
      expect(BarChart).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            datasets: [{ data: [5, 3, 2] }],
            labels: ['Yoga', 'Walk', 'Weights'],
          },
        }),
        {}
      );
    });
  });

  it('should show an empty chart when there is no activity data', async () => {
    fetchEntries.mockResolvedValue([]);
    processActivities.mockReturnValue({});

    const { queryByTestId } = render(<ActivityGraph />);

    await waitFor(() => {
      expect(BarChart).toHaveBeenCalled();
    });
  });
});
