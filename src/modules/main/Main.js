import React, {useState, useEffect, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSidebarMenu} from '@app/store/reducers/ui';

import Dashboard from '@pages/dashboard/Dashboard.index';
import Profile from '@pages/profile/Profile';
import UserVerificationLayout from '@app/pages/userVerification/UserVerificationLayout.index';
import RelyingPartiesList from '@app/pages/relyingParties/relyingPartiesList/RelyingParties.index';
import RpSubscription from '@app/pages/relyingParties/rpSubscription/RpSubscription.index';
import CreateRelyingParty from '@app/pages/relyingParties/createRelyingParties/CreateParty.index';
import NadraVerisys from '@app/pages/userVerification/registrationDetails/nadraVerisys/NadraVerisys.index';
import ManualEntry from '@app/pages/userVerification/registrationDetails/manualEntryPage/ManualEntry.index';
import AssignRoles from '@app/pages/admin/assignRoles/AssignRoles.index';
import BlockParties from '@app/pages/relyingParties/blockedRelyingParties/BlockParties.index';
import AssignPermissions from '@app/pages/roles/assignPermissions/AssignPermissions.index';
import CreateRole from '@app/pages/roles/createRole/CreateRole.index';
import NominateUser from '@app/pages/nominateUser/NominateUser.index';
import RpTokenGeneration from '@app/pages/relyingParties/RpTokenGeneration/RpTokenGeneration.index';
import Roles from '@app/pages/roles/rolesList/RolesList.index';
import NadraVerisysOcr from '@app/pages/userVerification/registrationDetails/nadraVerisysOCR/NadraVerisysOCR.index';
import ServerPhotoComparison from '@app/pages/userVerification/registrationDetails/serverPhotoComparison/ServerPhotoComparison.index';
import LivenessTest from '@app/pages/userVerification/registrationDetails/livenessTest/LivenessTest.index';
import FinalUserData from '@app/pages/userVerification/registrationDetails/finalUserData/FinalUserData.index';
import Header from './header/Header';
import Footer from './footer/Footer';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import PageLoading from '../../components/page-loading/PageLoading';
import './Main.css';
import CreateUser from '../../pages/admin/createUser/CreateUser.index';
import Admin from '../../pages/admin/adminList/Admin.index';

const Main = () => {
    const dispatch = useDispatch();
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    );
    const {isLoggedIn} = useSelector((state) => state.auth);
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const fetchProfile = async () => {
        setIsAppLoaded(true);
    };
    useEffect(() => {
        if (isLoggedIn) {
            fetchProfile();
        }
    }, [isLoggedIn]);
    useEffect(() => {
        document.getElementById('root').classList.remove('register-page');
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');

        document.getElementById('root').classList.add('sidebar-mini');
        document.getElementById('root').classList.add('layout-fixed');
        return () => {
            document.getElementById('root').classList.remove('sidebar-mini');
            document.getElementById('root').classList.remove('layout-fixed');
        };
    }, []);

    useEffect(() => {
        document.getElementById('root').classList.remove('sidebar-closed');
        document.getElementById('root').classList.remove('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
        if (isSidebarMenuCollapsed && screenSize === 'lg') {
            document.getElementById('root').classList.add('sidebar-collapse');
        } else if (isSidebarMenuCollapsed && screenSize === 'xs') {
            document.getElementById('root').classList.add('sidebar-open');
        } else if (!isSidebarMenuCollapsed && screenSize !== 'lg') {
            document.getElementById('root').classList.add('sidebar-closed');
            document.getElementById('root').classList.add('sidebar-collapse');
        }
    }, [screenSize, isSidebarMenuCollapsed]);

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />;
        }
        return (
            <>
                <Header toggleMenuSidebar={handleToggleMenuSidebar} />

                <MenuSidebar />

                <div
                    style={{position: 'relative'}}
                    className="Main content-wrapper"
                >
                    <div className="pt-3" />
                    <section className="content">
                        <Switch>
                            <Route
                                exact
                                path="/rp-subscription"
                                component={RpSubscription}
                            />
                            <Route
                                exact
                                path="/relying-parties-list"
                                component={RelyingPartiesList}
                            />
                            <Route
                                exact
                                path="/create-relying-party"
                                component={CreateRelyingParty}
                            />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/" component={Dashboard} />
                            <Route
                                exact
                                path="/user-registration"
                                component={UserVerificationLayout}
                            />
                            <Route
                                exact
                                path="/registration-manual-entry"
                                component={ManualEntry}
                            />
                            <Route
                                exact
                                path="/registration-nadra-verisys"
                                component={NadraVerisys}
                            />
                            <Route
                                exact
                                path="/registration-verisys-ocr"
                                component={NadraVerisysOcr}
                            />
                            <Route
                                exact
                                path="/registration-photo-comparison"
                                component={ServerPhotoComparison}
                            />
                            <Route
                                exact
                                path="/registration-liveness-test"
                                component={LivenessTest}
                            />
                            <Route
                                exact
                                path="/registration-final-userinfo"
                                component={FinalUserData}
                            />
                            <Route
                                exact
                                path="/blocked-relying-parties"
                                component={BlockParties}
                            />
                            <Route
                                exact
                                path="/create-user"
                                component={CreateUser}
                            />
                            <Route exact path="/roles-list" component={Roles} />
                            <Route
                                exact
                                path="/create-role"
                                component={CreateRole}
                            />
                            <Route
                                exact
                                path="/assign-permissions"
                                component={AssignPermissions}
                            />
                            <Route
                                exact
                                path="/assign-role"
                                component={AssignRoles}
                            />
                            <Route exact path="/user-list" component={Admin} />
                            <Route
                                exact
                                path="/nominate-user"
                                component={NominateUser}
                            />
                            <Route
                                exact
                                path="/rp-token"
                                component={RpTokenGeneration}
                            />
                        </Switch>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={handleToggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
