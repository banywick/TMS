function openPopup(popupClass) {
    document.querySelector(`.${popupClass}`).style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function closePopup(popupClass) {
    document.querySelector('.input_data_form').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.edit_form').style.display = 'none';
}