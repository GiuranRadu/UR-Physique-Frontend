
// const API_URL = 'http://localhost:3000';
const API_URL = 'https://ur-physique-backend.onrender.com';

//* GET ALL ACTIVITIES *
export async function getAllActivities() {
  const res = await fetch(`${API_URL}/activities`);

  if (res.status !== 200) throw Error('Failed getting activities');

  const { activities } = await res.json();
  return activities
}

//* GET sportsIncludedInSubscription *
export async function sportsIncludedInSubscription() {
  const user = JSON.parse(localStorage.getItem('loggedUser'))
  const res = await fetch(`${API_URL}/pricing/sportsIncludedInSubscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "subscription": user.subscription }),
  });

  if (res.status !== 200) throw Error('Failed ciuciu ⚠️');

  const { data } = await res.json();
  return data
}



//* GET ALL  CATEGORIES *
export async function getAllCategories() {
  const res = await fetch(`${API_URL}/pricing`);

  if (res.status !== 200) throw Error('Failed getting activities');

  const { categories } = await res.json();

  return categories
}

//* GET ALL SUBSCRIPTION plans *
export async function getAllSubscriptions() {
  const res = await fetch(`${API_URL}/pricing/allSubscriptions`);

  if (res.status !== 200) throw Error('Failed getting SUBSCRIPTION plans');

  const { data } = await res.json();

  return data
}

//* SELECT SUBSCRIPTION plan *
export async function selectSubscription(userId, subscription) {
  const res = await fetch(`${API_URL}/pricing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, subscription }),
  });

  if (res.status !== 200) throw Error('Failed selecting SUBSCRIPTION plan');

  const { user } = await res.json()
  // console.log(user);
  localStorage.setItem('loggedUser', JSON.stringify(user));

  return user
}

//* ADD ACTIVITY to array *
export async function addActivity(userId, activityId, activityName, caloriesBurned, duration, day) {
  const res = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, activityId, activityName, caloriesBurned, duration, day }),
  });

  if (res.status !== 200) throw Error('Failed adding activity');

  const { data } = await res.json()
  // console.log(user);
  localStorage.setItem('loggedUser', JSON.stringify(data));

  return data

}

//* Get All Selected User Activities *
export async function getAllSelectedUserActivities() {
  const user = JSON.parse(localStorage.getItem('loggedUser'))

  const res = await fetch(`${API_URL}/user/getAllSelectedUserActivities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "userId": user._id }),
  })

  if (res.status !== 200) throw Error('Failed selecting SUBSCRIPTION plan');

  const { data } = await res.json()

  return data

}



