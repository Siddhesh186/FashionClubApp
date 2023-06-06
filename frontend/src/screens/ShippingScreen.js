import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <CheckoutSteps step1 step2 />

        <Heading as="h1" mb="8" fontSize="3xl">
          Shipping
        </Heading>

        <form onSubmit={submitHandler}>
          {/* Address */}
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* City */}
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* Postal Code */}
          <FormControl id="postalCode" isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="number"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* Country */}
          <FormControl id="country" isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              placeholder="Enter Your Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormControl>

          <Button type="submit" mt="4" colorScheme="teal">
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default ShippingScreen;
