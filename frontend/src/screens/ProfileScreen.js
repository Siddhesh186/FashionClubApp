import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from '@chakra-ui/react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { IoWarning } from 'react-icons/io5';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} py="5" gap="10">
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
          </Heading>

          {error && <Message type="error">{error}</Message>}
          {message && <Message type="error">{message}</Message>}
          {success && <Message type="success">Profile updated</Message>}

          <form onSubmit={submitHandler}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="email">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="username@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Spacer h="3" />

            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="**************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" isLoading={loading} mt="4" colorScheme="teal">
              Update
            </Button>

            <Spacer h="3" />
          </form>
        </FormContainer>
      </Flex>

      <Flex direction="column">
        <Heading as="h2" mb="4">
          My Orders
        </Heading>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message type="error">{errorOrders}</Message>
        ) : (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>{order.totalPrice}</Td>
                  <Td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}
                  </Td>
                  <Td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <Icon as={IoWarning} color="red" />
                    )}
                  </Td>
                  <Td>
                    <Button
                      as={RouterLink}
                      to={`/order/${order._id}`}
                      colorScheme="teal"
                      size="sm">
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Grid>
  );
};

export default ProfileScreen;
