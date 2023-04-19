const errorDiv = document.querySelector('.error');
const errorMessage = errorDiv.querySelector('p');

if (errorMessage.textContent !== '') {
    errorDiv.classList.add('show');
}
