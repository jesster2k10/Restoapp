/**
 * Created by jesseonolememen on 14/10/2017.
 */
import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    FlatList,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import {
    Table,
    RowHeader,
    ReservationPopup,
    Confirmation,
    InputRow,
    Section
} from '../../Components';
import {
    getTables
} from '../../Actions/ReservationActions';
import {
    range
} from '../../Helpers';
import styles from './Styles/TablesStyles';
import strings from '../../Config/Localization';

class Tables extends Component {

    state = {
        popupIsOpen: false,
        table: null,
        chosenDay: 0,
        chosenTime: null,
        chosenSeats: 0,
        isConfirmationOpen: false,
        seats: []
    };

    componentWillMount() {
        const { getTables } = this.props;

        getTables();
    }

    chooseTable = (table) => {
        let seats = range(0, table.seats);

        this.setState({
            popupIsOpen: true,
            table,
            seats
        })
    };

    closePopup = () => {
        this.setState({
            popupIsOpen: false,
            chosenDay: 0,
            chosenTime: null,
        })
    };

    chooseDay = (day) => {
        this.setState({
            chosenDay: day,
        });
    };

    chooseTime = (time) => {
        this.setState({
            chosenTime: time,
        });
    };

    chooseSeats = (seats) => {
        this.setState({
            chosenSeats: seats
        });
    };

    generateCode = () => {
        return "Code"
    };

    closeConfirmation = () => {
        const { navigation } = this.props;

        this.setState({
            isConfirmationOpen: false
        }, () => {
            navigation.navigate('Menu');
        })
    };

    onBook = () => {
        this.closePopup();
        this.setState({
            isConfirmationOpen: true
        })
    };

    renderTable = ({ item }) => {
        return <Table table={item} onPress={() => this.chooseTable(item)} />
    };

    header = () => {
        return (
            <Animated.View>
                <Section>
                    <RowHeader style={styles.header} capital center spacing={12}>Enter your details</RowHeader>
                </Section>
                <Section style={styles.inputContainers}>
                    <InputRow
                        email
                        placeholder={strings.enterFullName}
                        label={strings.fullName}/>
                    <InputRow
                        phone
                        placeholder={strings.enterPhone}
                        label={strings.phone}/>
                    <InputRow
                        email
                        placeholder={strings.enterEmail}
                        label={strings.email}/>
                </Section>
                <Section>
                    <RowHeader style={styles.header} capital center spacing={12}>Choose a Table</RowHeader>
                </Section>
            </Animated.View>
        )
    };

    render() {
        const { tables } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={tables}
                    numColumns={2}
                    ListHeaderComponent={this.header}
                    renderItem={this.renderTable}
                    keyExtractor={( item ) => item.id}
                />
                <ReservationPopup
                    table={this.state.table}
                    isOpen={this.state.popupIsOpen}
                    onClose={this.closePopup}
                    chosenDay={this.state.chosenDay}
                    chosenTime={this.state.chosenTime}
                    chosenSeats={this.state.chosenSeats}
                    onChooseDay={this.chooseDay}
                    onChooseTime={this.chooseTime}
                    onChooseSeats={this.chooseSeats}
                    onBook={this.onBook}
                    seats={this.state.seats}
                    days={['Today', 'Tomorrow', 'Wed, Oct 18', 'Thr, Oct 19']}
                    times={['4:00 PM', '4:30 PM']}
                />
                <Confirmation
                    code={'code'}
                    isOpen={this.state.isConfirmationOpen}
                    onClose={this.closeConfirmation.bind(this)}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ reservations }) => ({
    tables: reservations.tables
});

const actions = {
    getTables
};

export default connect(mapStateToProps, actions)(Tables);