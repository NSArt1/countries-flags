import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { Info } from '../components/Info';
import { selectDetails } from '../store/details/details-selector';
import { clearDeatils, loadCountryByName } from '../store/details/details-actions';


export const Details = () => {
  const { name } = useParams();
  const dispatch =useDispatch();
  const {currentCountry, error, status} = useSelector(selectDetails);
  
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(loadCountryByName(name));
    return ()=> {
      dispatch(clearDeatils());
    }
  }, [name, dispatch]);
  return (
    
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {status==='loading' && <h2>Loading...</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </div>
  );
};
