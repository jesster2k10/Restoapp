/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import { Field } from 'redux-form';
import {
    View,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import {
    Picker,
    Item as FormItem
} from "native-base";
import {
    Text,
    Item,
    Input,
    Label,
    Form
} from 'native-base';
import {
    Metrics
} from '../../Themes';
import {
    Center
} from '../../Components';
import {
    Colours,
    Fonts
} from '../../Themes';
import styles from './Styles/InputRowStyles';
import strings from '../../Config/Localization';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import DeviceInfo from 'react-native-device-info';

import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

const required = value => value ? undefined : 'Required';

const InputComponent = (props) => {
    const {
        children,
        placeholder,
        onSubmitEditing,
        returnKeyType,
        onChangeText,
        phone,
        password,
        half,
        onTextChange,
        redux,
        onEndEditing,
        onFocus,
        onBlur,
        value,
        label,
        keyboardAppearance,
        keyboardType
    } = props.props;

    let _input = null;
    let error = redux ? props.meta.error : props.props.error;

    if (redux) {
        const { onChange, } = props.input;

        _input = phone ?
                <PhoneInput
                    style={styles.phoneInput}
                    flagStyle={styles.flag}
                    textStyle={styles.input}
                    pickerBackgroundColor={Colours.navigation.background}
                    pickerButtonColor={Colours.mainTextColor}
                    pickerItemStyle={styles.pickerItem}
                    offset={5}
                    onChangePhoneNumber={onChangeText}
                    cancelText={strings.cancel}
                    confirmText={strings.confirm}
                    keyboardAppearance={keyboardAppearance}
                    initialCountry={DeviceInfo.getDeviceCountry().toLowerCase()}
                    buttonTextStyle={styles.button}
                />
                :
                <TextInput
                    ref={input => this.input = input}
                    style={[styles.input, { width: half ? (width / 2) - 30 : width - 30 }]}
                    returnKeyType={returnKeyType || "next"}
                    placeholder={placeholder}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={password}
                    keyboardType={keyboardType}
                    keyboardAppearance={keyboardAppearance}
                    underlineColorAndroid='rgba(0,0,0,0.25)'
                    onChangeText={(arg1, arg2, arg3) => {
                    onChange(arg1, arg2, arg3);

                    if (onTextChange != null) {
                        onTextChange(arg1, arg2, arg3);
                    }
                }}/>
            ;
    } else {
        _input = phone ?
            <PhoneInput
                {...props}
                style={styles.phoneInput}
                flagStyle={styles.flag}
                textStyle={styles.input}
                pickerBackgroundColor={Colours.navigation.background}
                pickerButtonColor={Colours.mainTextColor}
                pickerItemStyle={styles.pickerItem}
                offset={5}
                onChangePhoneNumber={onChangeText}
                cancelText={strings.cancel}
                confirmText={strings.confirm}
                initialCountry={DeviceInfo.getDeviceCountry().toLowerCase()}
                buttonTextStyle={styles.button}
            />
            :
            <TextInput
                {...props}
                ref={input => InputRow.input = input}
                style={[styles.input, { width: half ? (width / 2) - 30 : width - 30 }]}
                returnKeyType={returnKeyType || "done"}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
                secureTextEntry={password}
                placeholderTextColor={Colours.lightestBody}
                onFocus={onFocus}
                onBlur={onBlur}
                onEndEditing={onEndEditing}
                value={value}
                onChangeText={onChangeText}/>
        ;
    }

    return (
        <View>
            <Text style={error != undefined ? styles.errorLabel : styles.label}> { error != undefined ? error : children != undefined ? children : label } </Text>
            <View>
                { _input }
            </View>
        </View>
    )
};

class InputRow extends Component {
    render() {
        const {
            first,
            half,
            id,
            redux
        } = this.props;

        let form = redux ?
            <Field
                ref={field => this.field = field}
                name={id}
                props={{ props: this.props}}
                component={InputComponent}
            /> : <InputComponent props={this.props}/>;

        return (
            <View style={[styles.container, { borderTopWidth: first ? 0.5 : 0 , flex: half ? 0.5 : 1 }]}>
                <Center>
                    {form}
                </Center>
            </View>
        );
    }
};

InputRow.defaultProps = {
    error: undefined,
    phone: false,
    password: false,
    onTextChange: null,
    keyboardAppearance: 'dark',
    keyboardType: 'default'
};

export default InputRow;