import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RunsStackScreenProps } from '../main-tab-navigator';
import { getRunDisplayData } from '../utils';
import { Run } from '../data/storage/getRuns';
import { RunnerText } from '../ui-components';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';
import { ThemeContext } from '../theme';

export function RunListRow(props: {
  run: Run;
  index: number;
  navigation: RunsStackScreenProps['navigation'];
}) {
  const { theme } = useContext(ThemeContext);
  const runDisplayData = getRunDisplayData(props.run);

  const containerStyle = [
    styles.container,
    props.index === 0 ? { marginTop: 8 } : undefined,
  ];

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('RunDetail', { runId: props.run._id })
      }>
      <View style={[{ backgroundColor: theme.colors.card }, containerStyle]}>
        <RunnerText style={styles.distance}>
          {runDisplayData.distance}
        </RunnerText>
        <RunnerSecondaryText>{runDisplayData.date}</RunnerSecondaryText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 8,
  },
  distance: {
    fontSize: 24,
  },
});
