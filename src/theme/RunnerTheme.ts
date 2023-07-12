import {
  DefaultTheme,
  DarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';

export type RunnerThemeName = 'light' | 'dark';

type ComplementaryTheme = {
  colors: {
    secondaryText: string;
    danger: string;
  };
};

export type RunnerTheme = NavigationTheme & ComplementaryTheme;

export const runnerLightNavigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
  },
};

export const runnerLightTheme: RunnerTheme = {
  ...runnerLightNavigationTheme,
  colors: {
    ...runnerLightNavigationTheme.colors,
    secondaryText: 'gray',
    danger: '#ff3b30',
  },
};

export const runnerDarkNavigationTheme: NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'green',
  },
};

export const runnerDarkTheme: RunnerTheme = {
  ...runnerDarkNavigationTheme,
  colors: {
    ...runnerDarkNavigationTheme.colors,
    secondaryText: 'gray',
    danger: '#ff443a',
  },
};
