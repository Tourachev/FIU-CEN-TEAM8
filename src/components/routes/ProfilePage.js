import React from "react";
import Navbar2 from "../NavBar2";
import Footer from "../Footer";
import Personal from "../profile/personal";
import Credit from "../profile/credit";
import Address from "../profile/address";
import AddressAddModal from "../profile/AddressAddModal";
import CreditAddModal from "../profile/CreditAddModal";
import Consumer from "../Context";
// import Provider from "../Context";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.state.username,
            personalInfo: [],
            addressInfo: [],
            creditInfo: []
        };
    }

    // componentDidMount() {
    //     <StatusContext.Consumer>
    //         {({ isLoggedIn, setStatus }) => setStatus(true)}> )}
    //     </StatusContext.Consumer>;
    // }

    render() {
        return (
            <div>
                <div className='body'>
                    <div className='container' id='profile-page'>
                        <h1 className='display-3 '>Welcome Home</h1>
                        <hr />
                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>Personal Info</h1>
                            </div>

                            <div className='profile-card-content'>
                                <Personal username={this.state.username} />
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Addresses On File
                                </h1>
                                <AddressAddModal
                                    username={this.state.username}
                                />
                            </div>
                            <div className='profile-card-content'>
                                <Address username={this.state.username} />
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Credit Cards On File
                                </h1>
                                <CreditAddModal
                                    username={this.state.username}
                                />
                            </div>
                            <div className='profile-card-content'>
                                <Credit username={this.state.username} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export { ProfilePage };
