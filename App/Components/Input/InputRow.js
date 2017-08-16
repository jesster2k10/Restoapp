/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import {
    Text,
    Item,
    Input,
    Label,
    Form
} from 'native-base';
import {
    Center
} from '../../Components';
import {
    Colours,
    Fonts
} from '../../Themes';
import styles from './Styles/InputRowStyles';

class InputRow extends Component {
    render() {
        const {
            children,
            placeholder,
            first,
            onSubmitEditing
        } = this.props;

        return (
            <View style={[styles.container, { borderTopWidth: first ? 0.5 : 0 }]}>
                <Center>
                    <View>
                        <Text style={styles.label}> { children } </Text>
                        <TextInput
                            style={styles.input}
                            placeholder={placeholder}
                            onSubmitEditing={onSubmitEditing}
                            placeholderTextColor={Colours.lightestBody}/>
                    </View>
                </Center>
            </View>
        )
    };
}

export default InputRow;