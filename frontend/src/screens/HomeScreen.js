import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Grid } from '@chakra-ui/react';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Heading as="h2" mb="8" fontSize="3xl">
        Latest and Greatest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            base: '1fr',
            md: '1fr 1fr',
            lg: '1fr 1fr 1fr',
            xl: '1fr 1fr 1fr 1fr',
          }}
          gap="8">
          {products.map((prod) => (
            <Product product={prod} key={prod._id} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
