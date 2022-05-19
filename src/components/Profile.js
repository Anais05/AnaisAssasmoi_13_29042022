import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrUpdateUser } from '../features/UserReducer';

export default function Profile() {
  const dispatch = useDispatch();
  const [editionMode, setEditionMode ] = useState(false);
  const [NewFirst, setNewFirst] = useState('');
  const [NewLast, setNewlast] = useState('');
  const user = useSelector(state => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditionMode(false);
    dispatch(GetOrUpdateUser(NewFirst, NewLast));
  };

  useEffect(() => {
    dispatch(GetOrUpdateUser());
  }, [dispatch]);

  if (user?.status === 'rejected') {
    return <span>Impossible de modifier</span>;
  }

  if (user?.status === 'pending' || user?.status === 'void') {
    return <p>Loading...</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!editionMode && 
            `${user?.data?.firstName} ${user?.data?.lastName}`
          }
        </h1>
        {!editionMode &&
          <button onClick={() => setEditionMode(true)} className="edit-button">Edit Name</button>
        }
        {editionMode && 
          <section className='edit-form'>
            <form onSubmit={handleSubmit}>
              <div className='form-inputs'>
                <div className="input-wrapper">
                  <label htmlFor="firstName">Firstname</label>
                  <input
                    type="text" id="firstName"
                    name="firstName"
                    value={NewFirst}
                    onChange={(e) => {setNewFirst(e.target.value);}}
                    placeholder={user?.data?.firstName}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName">Lastname</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={NewLast}
                    onChange={(e) => {setNewlast(e.target.value);}}
                    placeholder={user?.data?.lastName}
                  />
                </div>
              </div>
              <div className='form-btn'>
                <button type='submit' className="edit-button">Save</button>
                <button onClick={() => setEditionMode(false)} className="edit-button">Cancel</button>
              </div>
            </form>
          </section>
        }
      </div>

      <h2>Accounts</h2>
    </main>
  );
}