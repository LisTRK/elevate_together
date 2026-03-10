const emailInput = document.getElementById('emailInput');
const emailMessage = document.getElementById('emailMessage');
const commentInput = document.querySelector('.footer-comment');
const sendBtn = document.querySelector('.send-btn');
const modal = document.querySelector('.backdrop');
const modalCloseBtn = document.querySelector('.modal-btn');
const modalTitle = document.querySelector('.modal-title');
const modalText = document.querySelector('.modal-p');
const textInput = document.getElementById('textInput');

const maxLength = 100;

// Обрезка при вводе
textInput.addEventListener('input', () => {
  if (textInput.value.length > maxLength) {
    textInput.value = textInput.value.slice(0, maxLength) + '...';
  }
});

// Обрезка при потере фокуса (если пользователь вставил слишком длинный текст)
textInput.addEventListener('blur', () => {
  if (textInput.value.length > maxLength) {
    textInput.value = textInput.value.slice(0, maxLength) + '...';
  }
});

let formSubmittedSuccessfully = false;

// validation
emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  const valid = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);

  emailMessage.classList.remove('success', 'error');

  if (email === '') {
    emailMessage.textContent = '';
    emailMessage.style.borderTop = 'none';
  } else if (valid) {
    emailMessage.textContent = 'Success!';
    emailMessage.classList.add('success');
  } else {
    emailMessage.textContent = 'Invalid email, try again';
    emailMessage.classList.add('error');
  }
});

// submit form
sendBtn.addEventListener('click', async e => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const comment = commentInput.value.trim();
  const valid = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);

  if (!email || !valid) {
    alert('Please enter a valid email.');
    return;
  }

  if (!comment) {
    alert('Please leave a comment.');
    return;
  }

  try {
    const response = await fetch(
      'https://portfolio-js.b.goit.study/api/requests',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, comment }),
      }
    );

    if (!response.ok) throw new Error(await response.text());

    formSubmittedSuccessfully = true;

    // cleaning
    emailInput.value = '';
    commentInput.value = '';
    emailMessage.textContent = '';
    emailMessage.classList.remove('success', 'error');
  } catch (error) {
    formSubmittedSuccessfully = false;

    // error when submit
    modalTitle.textContent = 'Error submitting the form.';
    modalText.textContent = 'Please check your data and try again.';
  } finally {
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    modalCloseBtn.addEventListener('click', closeMenuMobile);
    modal.addEventListener('click', closeBackdrop);
    document.addEventListener('keydown', escClose);
  }
});

function closeBackdrop(e) {
  if (e.target === modal) {
    closeMenuMobile();
  }
}

function closeMenuMobile() {
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  modalCloseBtn.removeEventListener('click', closeMenuMobile);
  modal.removeEventListener('click', closeBackdrop);
  document.removeEventListener('keydown', escClose);
}

function escClose(e) {
  if (e.key === 'Escape') {
    closeMenuMobile();
  }
}
