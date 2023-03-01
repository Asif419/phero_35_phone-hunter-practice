const loadPhones = async (searchValue = 'iphone', dataLimit = 9) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = async (phones, dataLimit) => {
  // stop spinner
  toggleSpinner(false);

  // show all button 
  const showAll = document.getElementById('show-all');
  if (dataLimit === 9) {
    phones = phones.slice(0, 9);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
  }


  // no phone message
  const noPhoneMessage = document.getElementById('no-phone-message')
  if (!phones.length) {
    noPhoneMessage.classList.remove('d-none');
    showAll.classList.add('d-none');
  }
  else {
    noPhoneMessage.classList.add('d-none');
  }


  const phoneCards = document.getElementById('phone-cards');
  phoneCards.innerHTML = '';
  phones.forEach(phone => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');
    cardDiv.innerHTML = `
      <div class="card p-4">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="${phone.phone_name}">
        <div class="card-body">
          <h5 class="card-title f2-bold">${phone.phone_name}</h5>
        </div>
        <div class="card-footer">
          <small onclick="phoneDetailsLoader('${phone.slug}')" class="text-muted" data-bs-toggle="modal" data-bs-target="#phoneDetails">Click here to show details of ${phone.phone_name}</small>
        </div>
      </div>
    `
    phoneCards.appendChild(cardDiv);
  })
}

const btnSearch = document.getElementById('btn-search');

document.getElementById('search-field').addEventListener('keyup', function (event) {
  if(event.key === 'Enter') {
    valueOrNull(event.target.value);
  }
  valueOrNull(event.target.value);
})

btnSearch.addEventListener('click', function (event) {
  const searchValue = document.getElementById('search-field').value;
  preLoadPhones(searchValue);
})

const valueOrNull = (searchValue, dataLimit) => {
  if (searchValue === '') {
    btnSearch.setAttribute('disabled', '');
    preLoadPhones('iphone', dataLimit);
  }
  else {
    btnSearch.removeAttribute('disabled');
    preLoadPhones(searchValue, dataLimit);
  }
}

const preLoadPhones = (searchValue, dataLimit) => {
  toggleSpinner(true);
  loadPhones(searchValue, dataLimit);
}


const toggleSpinner = isLoading => {
  const display = document.getElementById('spinner');
  if (isLoading) {
    display.classList.remove('d-none');
  }
  else display.classList.add('d-none');
}

document.getElementById('btn-show-all').addEventListener('click', function (event) {
  const searchValue = document.getElementById('search-field').value;
  valueOrNull(searchValue, 10);
})

const phoneDetailsLoader = async phoneId => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  const res = await fetch(url);
  const data = await res.json();
  phoneDetailsDisplay(data.data);
  // console.log(phoneId);
}

const phoneDetailsDisplay = phone => {
  const modalHeader = document.getElementById('phoneDetailsLabel');
  const modalBody = document.getElementById('modal-body');
  modalHeader.innerText = phone.name;
  modalBody.innerText = phone.mainFeatures.chipSet;
  console.log(phone);
}

loadPhones();