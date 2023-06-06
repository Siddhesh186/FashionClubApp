import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Text,
  Grid,
  Heading,
  Box,
  Image,
  Link,
  Button,
} from '@chakra-ui/react';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, currVal) => acc + currVal.price * currVal.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice < 1000 ? 1000 : 0;
  cart.taxPrice = (18 * cart.itemsPrice) / 100;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate, order]);

  return (
    <Flex w="full" py="5" direction="column">
      <CheckoutSteps step1 step2 step3 step4 />

      <Grid templateColumns="3fr 2fr" gap="20">
        {/* Column 1 */}
        <Flex direction="column">
          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="xl" fontWeight="semibold" mb="3">
              Shipping
            </Heading>
            <Text>
              <strong>Address</strong>: {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}.
            </Text>
          </Box>

          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="xl" fontWeight="semibold" mb="3">
              Payment Method
            </Heading>
            <Text>
              <strong>Method</strong>: {cart.paymentMethod.toUpperCase()}
            </Text>
          </Box>

          <Box borderBottom="1px" py="6" borderColor="gray.300">
            <Heading as="h2" fontSize="xl" fontWeight="semibold" mb="3">
              Order Items
            </Heading>
            <Box>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <Box py="2">
                  {cart.cartItems.map((item, idx) => (
                    <Flex
                      key={idx}
                      alignItems="center"
                      justifyContent="space-between">
                      <Flex py="2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="12"
                          h="12"
                          objectFit="cover"
                        />
                      </Flex>
                      <Link as={RouterLink} to={`/products/${item.product}`}>
                        {item.name}
                      </Link>
                      <Text fontSize="lg" fontWeight="semibold">
                        {item.qty} x {item.price} = {item.qty * item.price}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Flex>

        {/* Column 2 */}
        <Flex
          direction="column"
          bgColor="white"
          justifyContent="space-between"
          py="8"
          px="8"
          shadow="md"
          rounded="lg"
          borderColor="gray.300">
          <Box>
            <Heading mb="6" as="h2" fontSize="3xl" fontWeight="bold">
              Order Summary
            </Heading>

            {/* Items price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between">
              <Text fontSize="xl">Items</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.itemsPrice}
              </Text>
            </Flex>

            {/* Shipping price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between">
              <Text fontSize="xl">Shipping</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.shippingPrice}
              </Text>
            </Flex>

            {/* Tax price */}
            <Flex
              borderBottom="1px"
              py="2"
              borderColor="gray.200"
              alignItems="center"
              justifyContent="space-between">
              <Text fontSize="xl">Tax</Text>
              <Text fontWeight="bold" fontSize="xl">
                ₹{cart.taxPrice}
              </Text>
            </Flex>

            {/* Total price */}
            <Flex py="2" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl">Total</Text>
              <Text fontWeight="bold" fontSize="xl" color="green.400">
                ₹{cart.totalPrice}
              </Text>
            </Flex>
          </Box>

          <Button
            size="lg"
            textTransform="uppercase"
            colorScheme="yellow"
            type="button"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}>
            Place Order
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default PlaceOrderScreen;
