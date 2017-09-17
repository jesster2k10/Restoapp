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
import DeviceInfo from 'react-native-device-info';

class InputRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPickerValue: '',
            isPickerVisible: true
        }
    }

    _onChangeText = () => {
        const {
            onChangeText,
        } = this.props;

        if (onChangeText) {
            onChangeText();
        }
    };

    renderField = ({input, meta: { touched, error, warning }}) => {
        console.log(input)
        const {
            children,
            placeholder,
            onSubmitEditing,
            returnKeyType,
            onChangeText,
            phone,
            password,
            half
        } = this.props;

        console.log(input)

        let _input = phone ?
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
                initialCountry={DeviceInfo.getDeviceCountry().toLowerCase()}
                buttonTextStyle={styles.button}
            />
        :
            <TextInput
                {...input}
                ref={input => this.input = input}
                style={[styles.input, { width: half ? (Metrics.fullWidth / 2) - 30 : Metrics.fullWidth - 30 }]}
                onFocus={this._onFocus}
                onChangeText={this._onChangeText}
                returnKeyType={returnKeyType || "next"}
                placeholder={placeholder}
                onSubmitEditing={onSubmitEditing}
                secureTextEntry={password}
                placeholderTextColor={Colours.lightestBody}/>
        ;

        return (
            <View>
                <Text style={error != undefined ? styles.errorLabel : styles.label}> { error || children } </Text>
                <View>
                    { _input }
                </View>
            </View>
        )
    };

    render() {
        const {
            children,
            first,
            half
        } = this.props;

        return (
            <View style={[styles.container, { borderTopWidth: first ? 0.5 : 0 , flex: half ? 0.5 : 1 }]}>
                <Center>
                    <Field
                        ref={field => this.field = field}
                        name={children.toLowerCase().replace(/\s/g, '_')}
                        component={this.renderField.bind(this)}
                    />
                </Center>
            </View>
        )
    };
}

InputRow.defaultProps = {
    error: '',
    phone: false,
    password: false,
    onChangeText: null
};

export default InputRow;