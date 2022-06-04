import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { GetOrUpdateUser } from '../features/UserReducer';
import Accounts from '../components/Accounts';

export default function Profile() {
  const dispatch = useDispatch();
  const [editionMode, setEditionMode ] = useState(false);
  const [newFirst, setNewFirst] = useState('');
  const [newLast, setNewlast] = useState('');
  const isLoggedIn = useSelector(state => state.login?.data);
  const user = useSelector(state => state.user);
  const firstname = user?.data?.firstName;
  const lastname = user?.data?.lastName;

  useEffect(() => {
    dispatch(GetOrUpdateUser());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditionMode(false);
    dispatch(GetOrUpdateUser(newFirst, newLast));
  };

  if (user?.status === 'rejected' || !isLoggedIn) {
    return <Navigate to='/login' />;
  }

  if (user?.status === 'pending' || user?.status === 'void') {
    return <p>Loading...</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1 className="profile-title">Welcome back<br />{!editionMode && `${firstname} ${lastname}`}</h1>
        {!editionMode &&
          <button onClick={() => setEditionMode(true)} className="edit-button">Edit Name</button>
        }
        {editionMode && 
          <section className='edit-form'>
            <form onSubmit={handleSubmit}>
              <div className='form-inputs'>
                <div className="input-wrapper">
                  <label htmlFor="firstName" className="sr-only">Firstname</label>
                  <input
                    type="text" id="firstName"
                    name="firstName"
                    value={newFirst}
                    onChange={(e) => {setNewFirst(e.target.value);}}
                    placeholder={firstname}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName" className="sr-only">Lastname</label>
                  <input
                    type="text" id="lastName"
                    name="lastName"
                    value={newLast}
                    onChange={(e) => {setNewlast(e.target.value);}}
                    placeholder={lastname}
                  />
                </div>
              </div>
              <div className='form-btn'>
                <button onClick={() => setEditionMode(false)} className="edit-button">Cancel</button>
                <button type='submit' className="edit-button">Save</button>
              </div>
            </form>
          </section>
        }
      </div>

      <Accounts />
    </main>
  );
}