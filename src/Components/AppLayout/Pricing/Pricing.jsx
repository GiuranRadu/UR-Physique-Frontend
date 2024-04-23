import { getAllCategories, getAllSubscriptions, selectSubscription } from "../../../services/apiActivities";
import { useLoaderData } from "react-router-dom";
import styles from './Pricing.module.css';
import entry_image from '../../../Assets/difficulties/entry.png'
import moderate_image from '../../../Assets/difficulties/moderate.png'
import hardcore_image from '../../../Assets/difficulties/hardcore.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import ConfirmDialog from '../../../Partials/ConfirmDialog';



function Pricing() {
  // const { categories, subscriptionPlans: { entry, moderate, hardcore } } = useLoaderData();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
  const { subscriptionPlans } = useLoaderData();
  const { isLoggedIn } = useContext(AuthContext);

  // Add some additional properties to object camed from Database
  subscriptionPlans[0].color = "#20835B", subscriptionPlans[0].price = "99", subscriptionPlans[0].image = entry_image;
  subscriptionPlans[1].color = "#FF8000", subscriptionPlans[1].price = "129", subscriptionPlans[1].image = moderate_image;
  subscriptionPlans[2].color = "#ad211c", subscriptionPlans[2].price = "159", subscriptionPlans[2].image = hardcore_image;


  function subscriptionBtn(subscription) {
    setConfirmDialog({
      isOpen: true,
      title: `Change to ${subscription} subscription ?`,
      subtitle: "Your available activities will change",
      onConfirm: () => handleSubscription(subscription)
    })
  }

  function handleSubscription(subscription) {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    selectSubscription(isLoggedIn._id, subscription)
      .then(() => location.reload())
      .catch(error => {
        console.error("Failed to select subscription:", error);
      });
  }

  return (
    <div className={styles.container} >
      {isLoggedIn && (
        isLoggedIn.subscription !== "none" ?
          <h1>Your current subscription is: <span>{isLoggedIn.subscription.toUpperCase()}</span></h1> :
          <h1>You are not subscribed, choose your destiny!</h1>
      )}

      <div className={styles['subscription-panel']} >
        {subscriptionPlans.map(sub => (
          <div key={sub.name} className={styles['subscription']} style={isLoggedIn.subscription === sub.name ? { opacity: 0.3, cursor: "not-allowed" } : {}}>
            <div className={styles['first-div']} style={{ backgroundColor: sub.color }}>
              <h1>{sub.name.toUpperCase()}</h1>
            </div>
            <div className={styles['second-div']} >
              <h2>Available Activities :</h2>
              <div >
                {sub.availableActivities.map((act, i) => <p key={i}>{act.name}</p>)}
              </div>
            </div>
            <div className={styles['third-div']}>
              <img src={sub.image} alt="none" />
              <div>
                <h1>€{sub.price} <span>/ month</span></h1>
              </div>
            </div>
            <div className={styles['fourth-div']}>
              {isLoggedIn && <button disabled={isLoggedIn.subscription === sub.name} onClick={() => subscriptionBtn(sub.name)}>Choose </button>}
            </div>
          </div>
        ))}
      </div>
      {isLoggedIn && isLoggedIn.subscription !== "none" && <button onClick={(e) => subscriptionBtn("none", e)}>Unsubscribe</button>}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  )
}

//! asta se va importa in `app.jsx` si se va adauga in array-ul de paths, unde dorim
//note APOI IL FOLOSIM MAI SUS cu `useLoaderData`
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const categories = await getAllCategories();
  const subscriptionPlans = await getAllSubscriptions();

  return { categories, subscriptionPlans };  //! returnam mai multe
}

export default Pricing
