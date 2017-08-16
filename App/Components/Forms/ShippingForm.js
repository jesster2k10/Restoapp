/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text
} from 'native-base';
import {
    InputRow,
    Section,
    RowHeader
} from '../../Components';
import strings from '../../Config/Localization';
import styles from './Styles/ShippingFormStyles';

class ShippingForm extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Section>
                    <InputRow
                        placeholder={ strings.enterFullName }
                        first
                    >
                        { strings.fullName }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        placeholder={ strings.enterAddress }
                    >
                        { strings.address }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        placeholder={ strings.enterCity }
                    >
                        { strings.city }
                    </InputRow>
                </Section>
                <Section>
                    <InputRow
                        placeholder={ strings.enterPostcode }
                    >
                        { strings.postcode }
                    </InputRow>
                    <InputRow
                        placeholder={ strings.enterState }
                    >
                        { strings.state }
                    </InputRow>
                </Section>
            </View>
        )
    };
}

export default ShippingForm;