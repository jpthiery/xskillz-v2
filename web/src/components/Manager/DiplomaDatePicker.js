import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import _ from 'lodash';

class DiplomaDatePicker extends Component {

    static propTypes = {
        saveDiploma: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {date: null, userId: null};
    }

    onChangeDate = (event, date) => this.setState({date});

    disableWeekends = date => date.getDay() === 0 || date.getDay() === 6;

    onUserChange = (name, index) => index >= 0 && this.setState({userId: this.props.users.list[index].id});

    saveDiploma = () => this.props.saveDiploma(this.state.userId, this.state.date);

    render() {
        const {date} = this.state;
        const users = this.props.users.list;
        let userNames = [];
        if (users) {
            userNames = _.flatMap(users, user => user.name);
        }
        return (
            <Paper style={{margin: '.2rem', padding: '1rem'}}>
                <h3>Définir la date de diplôme</h3>
                <div>
                    <AutoComplete
                        floatingLabelText="Équipier"
                        hintText="Chercher un équipier"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={userNames}
                        maxSearchResults={10}
                        onNewRequest={::this.onUserChange}/>
                </div>
                <div>
                    <DatePicker
                        hintText="Diplômé le"
                        value={date}
                        onChange={::this.onChangeDate}
                        shouldDisableDate={this.disableWeekends}/>
                </div>
                <div style={{marginTop: '1rem', clear: 'both'}}>
                    <RaisedButton label="Valider" primary={true} onClick={::this.saveDiploma}/>
                </div>
            </Paper>
        )
    }
}

export default DiplomaDatePicker;