// script.js

document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenu = document.getElementById('myDropdown');
    const dropdownToggle = document.getElementById('dropdownMenuButton');

    dropdownToggle.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click from immediately closing the dropdown
        dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown menu when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});