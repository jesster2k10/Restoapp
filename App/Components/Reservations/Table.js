/**
 * Created by jesseonolememen on 16/10/2017.
 */
import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './Styles/TableStyles';

const Table = ({ table, onPress, style }) => {
    const { name } = table;

    console.log(table)

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <Text style={styles.tableNumber}>{ name }</Text>
            </View>
        </TouchableOpacity>
    )
};

export default Table;