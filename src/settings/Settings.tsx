import React, { useContext } from 'react';
import {
  useUserDummyPreference,
  useUserThemePreference,
  useUserUnitPreference,
} from '../user-preferences';
import { StyleSheet, Switch, View } from 'react-native';
import { RunnerDivider, RunnerText } from '../ui-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackScreenProps } from './types';
import { ThemeContext } from '../theme';
import { RunnerSecondaryText } from '../ui-components/RunnerSecondaryText';

export function Settings() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<SettingsStackScreenProps['navigation']>();

  const [dummyPreference, setDummyPreference] = useUserDummyPreference();
  const [themePreference] = useUserThemePreference();
  const [unitPreference] = useUserUnitPreference();

  const toggleSwitch = () => setDummyPreference(!dummyPreference);

  return (
    <View style={[{ backgroundColor: theme.colors.card }, styles.container]}>
      <View style={styles.settingRow}>
        <RunnerText>Dummy setting</RunnerText>
        <Switch value={dummyPreference} onValueChange={toggleSwitch} />
      </View>
      <RunnerDivider />
      <TouchableOpacity onPress={() => navigation.navigate('ThemeSetting')}>
        <View style={styles.settingRow}>
          <RunnerText>Theme</RunnerText>
          <RunnerSecondaryText>{themePreference} &gt;</RunnerSecondaryText>
        </View>
      </TouchableOpacity>
      <RunnerDivider />
      <TouchableOpacity onPress={() => navigation.navigate('UnitSetting')}>
        <View style={styles.settingRow}>
          <RunnerText>Unit system</RunnerText>
          <RunnerSecondaryText>{unitPreference} &gt;</RunnerSecondaryText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    paddingVertical: 10,
  },
  settingRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 28,
  },
});
