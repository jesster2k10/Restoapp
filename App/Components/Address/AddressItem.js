import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';
import {
    selectPreviousAddress,
    resetSelectAddressDone
} from '../../Actions/FormActions';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/AddressItemStyles';
import { connect } from 'react-redux';
import strings from '../../Config/Localization';

class AddressItem extends Component {
    componentWillReceiveProps({ done, resetSelectAddressDone, navigation }) {
        if (done) {
            navigation.goBack();
            resetSelectAddressDone();
        }
    }

    render() {
        const {
            selectPreviousAddress
        } = this.props;

        const {
           name,
           address
        } = this.props.address;

        const {
           street1,
           suburb,
           state,
           postcode,
           country,
       } = address;

       return (
           <View style={styles.container}>
               <TouchableOpacity onPress={() => selectPreviousAddress(address)}>
                   <Grid>
                       <Col size={9}>
                           <Row>
                               <Text style={styles.name}>{ `${name.first != 'EMPTY_NAME' ? name.first : ''} ${name.last != 'EMPTY_NAME' || ''}` }</Text>
                           </Row>
                           <Row>
                               <Text style={styles.address}>{ street1 }</Text>
                           </Row>
                           <Row>
                               <Text style={styles.address}>{ suburb }</Text>
                           </Row>
                           <Row>
                               <Text style={styles.address}>{ state }</Text>
                           </Row>
                           <Row>
                               <Text style={styles.address}>{ postcode }</Text>
                           </Row>
                           <Row>
                               <Text style={styles.address}>{ country }</Text>
                           </Row>
                       </Col>
                       <Col size={1} style={styles.center}>
                           <Icon name='ios-arrow-forward-outline' color='white' size={25} />
                       </Col>
                   </Grid>
               </TouchableOpacity>
           </View>
       )
   }
}

const mapStateToProps = ({ checkout }) => ({
    done: checkout.select_address_done,
});

export default connect(mapStateToProps, { selectPreviousAddress, resetSelectAddressDone })(AddressItem);
