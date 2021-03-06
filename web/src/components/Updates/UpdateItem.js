import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import LabelButton from '../LabelButton';
import SkillCard from '../Skills/SkillCard';

class UpdateItem extends Component {

    render() {

        const { onUserClick, update, onSkillClick } = this.props;
        const { name, gravatarUrl, id, readable_id } = update.user;

        return (
            <div className="user-row">
                <Paper>
                    <div className="user-content">
                        <div className="user-left">
                            <Avatar src={gravatarUrl} size={75}/>
                        </div>
                        <div className="user-right">
                            <LabelButton label={name} onClick={()=>{onUserClick(readable_id)}}/>
                            <p className="user-update-label">{update.updates.length} nouvelle{update.updates.length>1?'s':''} compétence{update.updates.length>1?'s':''}</p>
                        </div>
                    </div>
                    <div className="domains-content">
                        {update.updates.map((update, index) => {
                            return (
                                <SkillCard skill={update.skill} key={index} onSkillClick={onSkillClick}/>
                            )
                        })}
                    </div>
                </Paper>
            </div>
        )
    }

}

export default UpdateItem;