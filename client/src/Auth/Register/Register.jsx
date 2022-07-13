import {InputLabel} from 'Project/Board/IssueDetails/EstimateTracking/Styles';
import React from 'react';
// import { useRouteMatch, useHistory } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {Button, Form,} from 'shared/components';

import './Register.css';
import toast from 'shared/utils/toast';

import {
    LoginPage,
    BackgroundPage,
    AuthPage,
    LeftPage,
    TitlePage,
} from './Styled';
import {FormElement, FormHeading} from "../../Create-Project/Styles";
import {Actions} from "../../Project/IssueCreate/Styles";
import useApi from "../../shared/hooks/api";
import api from "../../shared/utils/api";
import {storeAuthToken} from "../../shared/utils/authToken";

const Register = () => {
    const history = useHistory();

    const [{isCreating}, createUser] = useApi.post('/users');

    return (
        <LoginPage>
            <LeftPage>
                <TitlePage>
                    <h1>Welcome to PM App from Team 2</h1>
                    <p>Register your account</p>
                </TitlePage>
                <BackgroundPage/>
            </LeftPage>
            <AuthPage>
                <div style={{marginTop: '20px'}}>
                    <Form
                        enableReinitialize
                        initialValues={
                            {
                                name: '',
                                lastName: '',
                                email: '',
                                password: '',
                                avatarUrl: '',
                            }
                        }
                        validations={{
                            firstName: [Form.is.required(), Form.is.maxLength(100)],
                            lastName: [Form.is.required(), Form.is.maxLength(100)],
                            avatarUrl: [Form.is.required(), Form.is.url()],
                            email: [Form.is.required(), Form.is.maxLength(100), Form.is.email()],
                            password: [Form.is.required()],
                        }}
                        onSubmit={async (values, form) => {
                            try {
                                await createUser({
                                    ...values,
                                    name: values.firstName + values.lastName,
                                    projectId: [1]
                                });
                                const {accessToken} = await api.post('/login', {
                                    email: values.email,
                                    password: values.password
                                });
                                storeAuthToken(accessToken);
                                history.push('/');
                                toast.success('Create new account successfully.');
                            } catch (error) {
                                Form.handleAPIError(error, form);
                            }
                        }}
                    >
                        <FormElement>
                            <FormHeading>Create new User</FormHeading>
                            <Form.Field.Input
                                name="firstName"
                                label="First Name"
                            />
                            <Form.Field.Input
                                name="lastName"
                                label="Last Name"
                            />
                            <Form.Field.Input
                                name="email"
                                label="Email"
                            />
                            <Form.Field.Input
                                name="password"
                                label="Password"
                                type="password"
                            />
                            <Form.Field.Input
                                name="avatarUrl"
                                label="Avatar URL"
                                tip="Copy URL for your avatar"
                            />
                            <Actions>
                                <Button
                                    width={[1]}
                                    mt="1.5vh"
                                    height={['40px']}
                                    variant="primary"
                                    isWorking={isCreating}
                                >
                                    Create new account
                                </Button>
                            </Actions>
                        </FormElement>
                    </Form>

                </div>
            </AuthPage>
        </LoginPage>
    );
};

export default Register;
