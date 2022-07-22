import Axios from "./axiosClient";
import { print } from 'graphql';
import gql from 'graphql-tag';

const LOG_IN = gql`
    mutation login($username:String!, $password: String) {
        login(input:{username: $username, password: $password}) {
            username
            fullName
            avatar
            email
            phoneNumber
            roleName
            accessToken
        }
    }
`

class UserAPI {
    login = (data, setLoading = true) => {
        const payload = {
            query: print(LOG_IN),
            variables:{
                username: data.username,
                password: data.password
            }
        }
        return Axios.postMethod(payload, setLoading);
    };
}

const userService = new UserAPI();

export default userService;
