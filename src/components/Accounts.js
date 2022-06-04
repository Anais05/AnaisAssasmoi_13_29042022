import axios from "axios";
import { baseURL } from "../utils/baseUrl";
import { useEffect, useState } from 'react';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAccounts();
  }, []);

  async function GetAccounts() {
    setLoading(true);
    const headers = {
      'authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    try { 
      const response = await axios.get(baseURL + 'user/accounts', { headers });
      const data = await response.data?.body;
      setAccounts(data);
      setLoading(false);
    }
    catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    };
  }

    return (
      <div>
        <h2 className="sr-only">Accounts</h2>
        {loading ? (
          <div>...Accounts Loading.....</div>
        ) : (
          <div>
            {accounts.map((account, index) => (
            <section className="account" key={index}>
              <div className="account-content-wrapper">
                <h3 className="account-title">{account.title}</h3>
                <p className="account-amount">{`$${account.amount}`}</p>
                <p className="account-amount-description">{account.description}</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
              </div>
            </section>
            ))}
          </div>
        )}
      </div>
    )
}

