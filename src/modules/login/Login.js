import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {Checkbox, Button, Input} from '@components';
import {faSignature, faLock} from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import {login} from '../../store/reducers/auth.thunk';
import {resetMessage} from '../../store/reducers/auth';

const Login = () => {
    const {error, isLoggedIn, isLoading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const history = useHistory();
    const [t] = useTranslation();

    const loginUser = async (formData) => {
        dispatch(login(formData));
    };
    useEffect(() => {
        if (isLoggedIn) {
            history.replace('/');
        }
    }, [isLoggedIn]);
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            loginUser(values);
            dispatch(resetMessage());
        }
    });

    return (
        <div className="main content h-100">
            <div className="row h-100">
                <div className="col-6 col-md-6 col-sm-4 d-xs-none bg-primary d-flex justify-content-center align-items-center hidden-xs">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                </div>
                <div className="col-6 col-md-6 col-sm-8  d-flex justify-content-center align-items-center">
                    <div className="form-width">
                        <div className="text-center pb-4">
                            <Link
                                to="/"
                                className="h1 text-decoration-none text-primary"
                            >
                                <b>meraID</b>
                            </Link>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <Input
                                    icon={faSignature}
                                    placeholder="User Name"
                                    type="text"
                                    formik={formik}
                                    formikFieldProps={formik.getFieldProps(
                                        'userName'
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    icon={faLock}
                                    placeholder="Password"
                                    type="password"
                                    formik={formik}
                                    formikFieldProps={formik.getFieldProps(
                                        'password'
                                    )}
                                />
                            </div>
                            {error && <p className="error-msg">{error} !</p>}
                            <div className="row">
                                <div className="col-8">
                                    <Checkbox
                                        checked={false}
                                        label={t('login.label.rememberMe')}
                                    />
                                </div>
                                <div className="col-4">
                                    <Button
                                        block
                                        type="submit"
                                        isLoading={isLoading}
                                    >
                                        {t('login.button.signIn.label')}
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <p className="mb-1">
                            <Link to="/forgot-password">
                                {t('login.label.forgotPass')}
                            </Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/register" className="text-center">
                                {t('login.label.registerNew')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
