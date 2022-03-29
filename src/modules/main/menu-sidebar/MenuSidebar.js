import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import './MenuSidebar.css';

export const MENU = [
    {
        name: 'menusidebar.label.dashboard',
        path: '/'
    },
    {
        name: 'User Registrations',
        path: '/user-registration'
    },
    {
        name: 'Relying Parties (RPs)',
        children: [
            {
                name: 'Create Relying Party',
                path: '/create-relying-party'
            },
            {
                name: 'Active Relying Parties',
                path: '/relying-parties-list'
            },
            {
                name: 'Block Relying Parties',
                path: '/blocked-relying-parties'
            },
            {
                name: 'Generate Rp Token',
                path: '/rp-token'
            }
        ]
    },
    {
        name: 'User Admin',
        children: [
            {
                name: 'Create User',
                path: '/create-user'
            },
            {
                name: 'User List',
                path: '/user-list'
            },
            {
                name: 'Assign Role',
                path: 'assign-role'
            }
        ]
    },
    {
        name: 'Roles',
        children: [
            {
                name: 'Create Role',
                path: '/create-role'
            },
            {
                name: 'Roles List',
                path: '/roles-list'
            },
            {
                name: 'Assign Permissions',
                path: 'assign-permissions'
            }
        ]
    },
    {
        name: 'RP Subscription',
        path: '/rp-subscription'
    },
    {
        name: 'Nominate User',
        path: '/nominate-user'
    },
    {
        name: 'Billing',
        path: '/billing'
    }
];

const MenuSidebar = () => {
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <aside className="main-sidebar Side elevation-4">
            <Link to="/" className="L brand-link">
                <img
                    style={{marginLeft: '10px'}}
                    width="40px"
                    height="40px"
                    src="/logo.png"
                    alt=""
                    className="LogoImg img-circle elevation-1"
                />
                meraID
                {/* <span className="brand-text font-weight-light">meraID</span> */}
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <Link to="/profile">
                            <img
                                style={{backgroundColor: 'white'}}
                                src={user.picture || '/img/default-profile.png'}
                                className="img-circle elevation-1"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="info">
                        <Link
                            to="/profile"
                            className="L RemoveHover d-block"
                            style={{textDecoration: 'none'}}
                        >
                            {/* {user.email} */}
                            Ali Khan
                        </Link>
                    </div>
                </div>

                <nav className="mt-2 overflow-hidden">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        role="menu"
                    >
                        {MENU.map((menuItem) => (
                            <MenuItem key={menuItem.name} menuItem={menuItem} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
