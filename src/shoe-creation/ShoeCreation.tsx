import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { RootStackScreenProps } from '../root-stack-navigator';
import { ThemeContext } from '../theme';
import { RunnerDivider, RunnerInputRow, RunnerText } from '../ui-components';
import DatePicker from 'react-native-date-picker';
import { addShoe } from '../data-realm/shoe/shoeMutations';
import { useRealm } from '../data-realm/RealmProvider';
import { UnitPreference, useUserUnitPreference } from '../user-preferences';
import { validateShoeInput } from './validation';
import { ShoeProps } from '../data-realm/shoe/shoeModel';
import { convertDistanceToMeters } from '../utils';

export function ShoeCreation() {
  const realm = useRealm();
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RootStackScreenProps['navigation']>();
  const [unitPreference] = useUserUnitPreference();

  const isEdit = false;

  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [lifespan, setLifespan] = useState('');

  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);

  const onPressDone = useCallback(() => {
    const shoeInput = {
      brand,
      name,
      startDate,
      hasEndDate,
      endDate,
      lifespan,
    };
    const { valid, errors } = validateShoeInput(shoeInput);

    if (!valid) {
      Alert.alert(
        'Error',
        'You need to resolve the following errors before continuing:\n' +
          errors.join('\n'),
        [{ text: 'Ok' }],
      );
      return;
    }

    const shoeProps: ShoeProps = {
      brand,
      name,
      startDate,
      endDate: hasEndDate ? endDate : undefined,
      lifespanMeters: convertDistanceToMeters(
        parseInt(lifespan, 10),
        unitPreference,
      ).convertedDistance,
    };

    addShoe(shoeProps, realm);
  }, [
    brand,
    endDate,
    hasEndDate,
    lifespan,
    name,
    realm,
    startDate,
    unitPreference,
  ]);

  useEffect(() => {
    const headerLeft = () => (
      <Button
        title="Cancel"
        onPress={() => navigation.goBack()}
        color={theme.colors.danger}
      />
    );
    const headerRight = () => (
      <Button
        title={isEdit ? 'Done' : 'Add'}
        onPress={onPressDone}
        color={theme.colors.primary}
      />
    );
    const title = isEdit ? 'Edit shoe' : 'New shoe';
    navigation.setOptions({ title, headerLeft, headerRight });
  }, [isEdit, navigation, onPressDone, theme.colors]);

  const brandInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const lifespanInputRef = useRef<TextInput>(null);

  const endDateTextStyle = useMemo(
    () => ({
      color: hasEndDate ? theme.colors.text : theme.colors.secondaryText,
    }),
    [hasEndDate, theme.colors.secondaryText, theme.colors.text],
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.formContainer, { backgroundColor: theme.colors.card }]}>
        <RunnerInputRow
          onPress={() => {
            brandInputRef.current?.focus();
          }}>
          <RunnerText>Brand</RunnerText>
          <TextInput
            ref={brandInputRef}
            placeholder="Brand"
            placeholderTextColor={theme.colors.placeholderText}
            maxLength={25}
            value={brand}
            onChangeText={text => setBrand(text)}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow
          onPress={() => {
            nameInputRef.current?.focus();
          }}>
          <RunnerText>Name</RunnerText>
          <TextInput
            ref={nameInputRef}
            placeholder="Name"
            placeholderTextColor={theme.colors.placeholderText}
            maxLength={25}
            value={name}
            onChangeText={text => setName(text)}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow
          onPress={() => {
            setStartDatePickerOpen(true);
          }}>
          <RunnerText>Start Date</RunnerText>
          <RunnerText>
            {startDate.toLocaleString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </RunnerText>
          <DatePicker
            modal
            open={startDatePickerOpen}
            mode="date"
            date={startDate}
            onConfirm={(datePicked: Date) => {
              setStartDatePickerOpen(false);
              setStartDate(datePicked);
            }}
            onCancel={() => {
              setStartDatePickerOpen(false);
            }}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow
          onPress={() => {
            setEndDatePickerOpen(true);
          }}>
          <RunnerText>Has ended life</RunnerText>
          <Switch
            value={hasEndDate}
            onValueChange={value => setHasEndDate(value)}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow
          onPress={() => {
            setEndDatePickerOpen(true);
          }}
          disabled={!hasEndDate}>
          <RunnerText style={endDateTextStyle}>End Date</RunnerText>
          <RunnerText style={endDateTextStyle}>
            {endDate.toLocaleString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </RunnerText>
          <DatePicker
            modal
            open={endDatePickerOpen}
            mode="date"
            date={endDate}
            onConfirm={(datePicked: Date) => {
              setEndDatePickerOpen(false);
              setEndDate(datePicked);
            }}
            onCancel={() => {
              setEndDatePickerOpen(false);
            }}
          />
        </RunnerInputRow>
        <RunnerDivider />
        <RunnerInputRow
          onPress={() => {
            lifespanInputRef.current?.focus();
          }}>
          <RunnerText>
            Lifespan ({unitPreference === UnitPreference.Imperial ? 'mi' : 'km'}
            )
          </RunnerText>
          <TextInput
            ref={lifespanInputRef}
            placeholder="800"
            placeholderTextColor={theme.colors.placeholderText}
            maxLength={5}
            keyboardType="numeric"
            value={lifespan}
            onChangeText={text => setLifespan(text)}
          />
        </RunnerInputRow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
