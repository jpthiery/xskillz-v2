import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import Config from '../Config';
import {getToken} from './auth';

export const RECEIVE_SKILLS = 'RECEIVE_SKILLS';
export const SKILL_GOT = 'SKILL_GOT';
export const SKILL_REMOVED = 'SKILL_REMOVED';

export function receiveSkills(skills) {
    return {
        type: RECEIVE_SKILLS,
        payload: {
            skills
        }
    }
}

export function fetchSkills() {
    return dispatch => {

        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                token: getToken()
            }
        };

        return fetch(`${Config.apiURL}/skills`, config)
            .then(response => {
                if (response.status >= 400 && response.status <= 403) {
                    browserHistory.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(skills => dispatch(receiveSkills(skills)));
    }
}

export function skillGot(skill) {
    return {
        type: SKILL_GOT,
        payload: {
            skill
        }
    };
}

export function skillRemoved(id) {
    return {
        type: SKILL_REMOVED,
        payload: {id}
    };
}

export const SKILL_UPDATED = 'SKILL_UPDATED';

export function skillUpdated(skill) {
    return {
        type: SKILL_UPDATED,
        payload: {skill}
    }
}

export function updateSkill(skill) {
    return dispatch => {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify(skill)
        };

        return fetch(`${Config.apiURL}/me/skills/${skill.id}`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error('Cannot add skill');
                }
            })
            .then(json => dispatch(skillUpdated(skill)));
    };
}

export const SKILL_ADDED = 'SKILL_ADDED';

export function skillAdded(skill) {
    return {
        type: SKILL_ADDED,
        payload: {skill}
    }
}

export function addSkill(skill) {
    return dispatch => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify(skill)
        };

        return fetch(`${Config.apiURL}/me/skills`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error('Cannot add skill');
                }
            })
            .then(addedSkill => {
                skill.id = addedSkill.id;
                return skill
            })
            .then(skill => dispatch(skillAdded(skill)));
    };
}

export function removeSkill(id) {
    return dispatch => {
        const config = {
            method: 'DELETE',
            headers: {
                token: getToken()
            }
        };

        return fetch(`${Config.apiURL}/me/skills/${id}`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error('Cannot remove skill');
                }
            })
            .then(() => dispatch(skillRemoved(id)));
    };
}

export const SKILLS_MERGED = 'SKILLS_MERGED';

export function skillMerged() {
    return {
        type: SKILLS_MERGED
    };
}

export function mergeSkills(payload) {
    return dispatch => {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: getToken()
            },
            body: JSON.stringify(payload)
        };
        return fetch(`${Config.apiURL}/skills`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    browserHistory.push('/signin');
                } else {
                    throw new Error('Cannot merge skills');
                }
            })
            .then(json => dispatch(skillMerged(json)));
    }
}