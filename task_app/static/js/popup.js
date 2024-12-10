function openPopup(popupId) {
    document.querySelector(`.${popupId}`).style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function closePopup() {
    document.querySelector('.input_data_form').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}