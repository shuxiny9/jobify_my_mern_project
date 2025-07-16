import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import { Logo, FormRow ,SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
//import { toast } from 'react-toastify';
import { toast } from '../utils/toast'; // toast.js


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful!');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Registration failed');
    return error;
  }
};

const Register = () => {
  //move code to SubmitBtn component
  //const navigation = useNavigation();
  //console.log(navigation);
  //const isSubmitting = navigation.state === 'submitting';


  const testToast = () => {
    toast.success('Toast is working! 🎉');
    toast.error('Error toast also works!');
    toast.info('Info toast too!');
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='john' />
        <FormRow type='text' name='lastName' labelText='last name' defaultValue='smith' />
        <FormRow type='text' name='location' defaultValue='my city' />
        <FormRow type='email' name='email' defaultValue='john@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />

        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;