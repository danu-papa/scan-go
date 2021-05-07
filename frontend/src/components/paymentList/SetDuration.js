/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import IconAntD from 'react-native-vector-icons/AntDesign';
import DatePicker from './DatePicker';
import AppText from '../common/AppText';

const SetDuration = ({startDate, setStartDate, endDate, setEndDate}) => {
  const [showStartDatepicker, setShowStartDataPicker] = useState(false);
  const [showEndDatepicker, setShowEndDataPicker] = useState(false);

  const toggleStartDatePicker = () => {
    setShowStartDataPicker(!showStartDatepicker);
    console.log(showStartDatepicker);
  };
  const toggleEndDatePicker = () => {
    setShowEndDataPicker(!showEndDatepicker);
    console.log(showEndDatepicker);
  };

  const onChangeStartDate = (event, selectedDate) => {
    toggleStartDatePicker();
    let diff = endDate.getTime() - selectedDate.getTime();
    if (Math.floor(diff / (1000 * 60 * 60 * 24)) < 0) {
      alert('기간 설정이 잘못 되었습니다.');
      return;
    }
    setStartDate(selectedDate);
  };
  const onChangeEndDate = (event, selectedDate) => {
    toggleEndDatePicker();
    let diff = selectedDate.getTime() - startDate.getTime();
    if (Math.floor(diff / (1000 * 60 * 60 * 24)) < 0) {
      alert('기간 설정이 잘못 되었습니다.');
      return;
    }
    setEndDate(selectedDate);
  };
  return (
    <>
      <View style={durationStyles.picker}>
        <AppText style={durationStyles.grayText}>기간 설정</AppText>
        <TouchableOpacity
          underlayColor="rgb(144, 144, 144)"
          onPress={toggleStartDatePicker}>
          <AppText style={durationStyles.grayText}>
            {startDate && startDate.toLocaleDateString('ko-KR')}
            <IconAntD name="calendar" size={15} />
          </AppText>
        </TouchableOpacity>
        <AppText>~</AppText>
        <TouchableOpacity onPress={toggleEndDatePicker}>
          <AppText style={durationStyles.grayText}>
            {endDate && endDate.toLocaleDateString('ko-KR')}
            <IconAntD name="calendar" size={15} />
          </AppText>
        </TouchableOpacity>
      </View>
      {showStartDatepicker && (
        <DatePicker
          date={startDate}
          onChangeDate={onChangeStartDate}
          toggleDatePicker={toggleStartDatePicker}
        />
      )}
      {showEndDatepicker && (
        <DatePicker
          date={endDate}
          onChangeDate={onChangeEndDate}
          toggleDatePicker={toggleEndDatePicker}
        />
      )}
    </>
  );
};

export default SetDuration;

const durationStyles = StyleSheet.create({
  picker: {
    height: 35,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  durationBtn: {
    borderWidth: 1,
    borderColor: 'rgb(100, 100, 100)',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  grayText: {
    color: 'rgb(100, 100, 100)',
  },
});
