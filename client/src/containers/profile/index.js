import React, { Component } from 'react';
import Wishlist from './Wishlist'
class Profile extends Component {
    render() {
        return (
            <div>
                <h3>Profile Index</h3>
                <Wishlist />
            </div>
        );
    }
}

export default Profile;