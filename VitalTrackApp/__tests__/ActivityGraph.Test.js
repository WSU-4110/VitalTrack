import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { transformActivityData } from '../src/components/analytics/ActivityGraph';
import ActivityGraph from '../src/components/analytics/ActivityGraph';
import { fetchEntries, processActivities } from '../src/components/analytics/DataProcessor';
import { BarChart } from 'react-native-chart-kit';

jest.mock('../src/components/analytics/DataProcessor');
jest.mock('react-native-chart-kit', () => ({
  BarChart: jest.fn(() => <></>),
}));

describe('transformActivityData function', () => {

  it('should make activity data the correct format', () => {
    const mockActivityData = { Yoga: 5, Walk: 3, Weights: 2 };

    const result = transformActivityData(mockActivityData);

    expect(result).toEqual({
      labels: ['Yoga', 'Walk', 'Weights'],
      datasets: [
        {
          data: [5, 3, 2],
        },
      ],
    });
  });
 });

describe('ActivityGraph Component', () => {

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
