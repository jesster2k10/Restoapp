/**
 * Created by jesseonolememen on 15/08/2017.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colours, Fonts } from '../../Themes';
import strings from 'react-native-localization';
import styles from './Styles/IconTabBarStyles';

class IconTabBar extends Component {
    _getIcons = (tabs, goToPage, activeTab, noChange) => {
        return tabs.map((tab, i) => {
            let arr = tab.split(',');
            let icon = arr[0];
            let name = arr[1];


            return (
                <View key={tab} style={styles.tab}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name={icon}
                            size={30}
                            color={ this._tabColor(activeTab, i) }
                        />
                        <Text style={[styles.title, { color: this._tabColor(activeTab, i), fontFamily: this._tabTitle(activeTab, i)  }]}>{ name }</Text>
                    </View>
                </View>
            );
        });
    };

    _tabColor = (activeTab, i) => { return activeTab === i ? Colours.mainTextColor : Colours.lightBody };
    _tabTitle = (activeTab, i) => { return activeTab === i ? Fonts.type.medium : Fonts.type.thin };

    render() {
        const {
            style,
            goToPage,
            activeTab,
            tabs,
            noChange
        } = this.props;

        return (
            <View style={[styles.tabs, style]}>
                { this._getIcons(tabs,goToPage,activeTab,noChange) }
            </View>
        )
    };
}

export default IconTabBar;